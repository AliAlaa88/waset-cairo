import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";


const tourController = {
    getAllTours: catchAsync(async (req, res, next) => {
        const allTours = await client.query(
            "SELECT * FROM TOUR;"
        );

        if(allTours.rowCount) return res.status(200).json(allTours.rows);
        
        return res.status(404).json({error: "No data found!"});
    }),
    getTour: catchAsync(async (req, res, next) => {
        const tourID = req.params.id;
        const tour = await client.query(
            "SELECT * FROM TOUR WHERE ID = $1;",
            [tourID]
        );

        if(tour.rowCount) return res.status(200).json(tour.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    createTour: catchAsync(async (req, res, next) => {
        const {startDate, endDate, ticketCap, eventID, tourpackageID} = req.body;
        const opID = req.user.id;

        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const create = await client.query(
            `INSERT INTO TOUR (STARTDATE, ENDDATE, TICKETCAPACITY, OPERATORID, EVENTID, TOURPACKAGEID)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [startDate, endDate, ticketCap, opID, eventID || null, tourpackageID || null]
        );
        
        res.status(201).json({msg: "Created tour successfully!", data: create.rows});
    }),
    deleteTour: catchAsync(async (req, res, next) => {
        const tourID = req.params.id;
        const opID = req.user.id;

        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }
        
        const del = await client.query(
            "DELETE FROM TOUR WHERE ID = $1 AND OPERATORID = $2;",
            [tourID, opID]
        );

        if(!del.rowCount) return res.status(400).json({error: "You are not allowed to do this action!"});

        res.status(200).json({msg: "Deleted Tour Successfully!"});
    }),

    updateTour: catchAsync(async (req, res, next) => {
        const tourID = req.params.id;
        const {startDate, endDate, ticketCap, eventID, tourpackageID} = req.body;

        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const update = await client.query(
            `UPDATE TOUR SET STARTDATE = $1, ENDDATE = $2, TICKETCAPACITY = $3, EVENTID = $4, TOURPACKAGEID = $5 WHERE ID = $6 RETURNING *;`,
            [startDate, endDate, ticketCap, eventID || null, tourpackageID || null, tourID]
        );

        if(!update.rowCount) {
            const err = new Error("Tour doesnt exist!");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json({msg: "Updated Tour Successfully!", data: update.rows});
    }),

    getTouristsGoingToTour: catchAsync(async (req, res, next) => {
        const tourID = req.params.tourid;
        const tourists = await client.query(
            `SELECT FNAME, LNAME, USERNAME, EMAIL, GENDER, PHONENUMBER, BIRTHDATE, NATIONALITY, LANGUAGE, JOINDATE
            FROM TOURIST AS T, TICKET AS TK, TOUR AS TR
            WHERE T.ID = TK.TOURISTID AND TK.TOURID = TR.ID AND TK.TOURID = $1;`,
            [tourID]
        );
        if(!tourists.rowCount) return res.status(404).json({error: "No data found!"});

        return res.status(200).json(tourists.rows);
    }),

    getToursByGuide: catchAsync(async (req, res, next) => {
        const guideID = req.params.guideid;
        const tours = await client.query(
            `SELECT TR.ID as id, 
            TR.STARTDATE AS startdate,
            COALESCE(TP.NAME, E.NAME) AS tripName,
            COALESCE(TP.MEETINGLOCATION, E.MEETINGLOCATION) AS meetingLocation,
            COALESCE(TP.DURATION, E.DURATION) AS duration,
            COUNT(TK.ID) AS totalTickets,
            AVG(F.RATING) AS averageRating
            FROM TOUR TR
            LEFT JOIN TOUR_PACKAGE TP ON TR.TOURPACKAGEID = TP.ID
            LEFT JOIN EVENT E ON TR.EVENTID = E.ID
            LEFT JOIN TICKET TK ON TR.ID = TK.TOURID
            LEFT JOIN TOURIST_FEEDBACK TF ON TR.ID = TF.TOURID
            LEFT JOIN FEEDBACK F ON TF.FEEDBACKID = F.ID
            WHERE TR.TOURGUIDEID = $1
            GROUP BY TR.ID, TR.STARTDATE, TP.NAME, TP.MEETINGLOCATION, TP.DURATION, E.NAME, E.MEETINGLOCATION, E.DURATION;`,
            [guideID]
        );

        if(!tours.rowCount) return res.status(404).json({error: "No data found!"});

        return res.status(200).json(tours.rows);
    }),

    getToursThatDidntStart: catchAsync(async (req, res, next) => {
        const tours = await client.query(
            "SELECT * FROM TOUR WHERE STARTDATE > CURRENT_DATE;"
        );
        if(!tours.rowCount) return res.status(404).json({error: "No data found!"});

        return res.status(200).json(tours.rows);
    }),
    
    getTouristTourHistory: catchAsync(async (req, res, next) => {
        const touristID = req.params.touristid;

        const tours = await client.query(
            `SELECT T.*
            FROM TICKET TK JOIN TOUR T ON TK.TOURID = T.ID
            WHERE TK.TOURISTID = $1;`, [touristID]
        );

        if(!tours.rowCount) return res.status(404).json({error: "No data found!"});

        return res.status(200).json(tours.rows);
    })
};


export default tourController;