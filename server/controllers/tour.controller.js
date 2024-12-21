import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";


const tourController = {
    getAllTours: catchAsync(async (req, res, next) => {
        const allTours = await client.query(
            `SELECT TOUR.*, COUNT(TICKET.ID) AS ticket_count
            FROM TOUR
            LEFT JOIN TICKET ON TOUR.ID = TICKET.TOURID
            GROUP BY TOUR.ID;`
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
        const {startDate, endDate, tourguideID, ticketCap, eventID, tourpackageID} = req.body;
        const opID = req.user.id;

        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const create = await client.query(
            `INSERT INTO TOUR (STARTDATE, ENDDATE, TOURGUIDEID, TICKETCAPACITY, OPERATORID, EVENTID, TOURPACKAGEID)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [startDate, endDate, tourguideID, ticketCap, opID, eventID || null, tourpackageID || null]
        );
        
        res.status(201).json({msg: "Created tour successfully!", data: create.rows});
    }),
    deleteTour: catchAsync(async (req, res, next) => {
        const tourID = req.params.id;
        
        const del = await client.query(
            "DELETE FROM TOUR WHERE ID = $1;",
            [tourID]
        );

        if(!del.rowCount) return res.status(400).json({error: "You are not allowed to do this action!"});

        res.status(200).json({msg: "Deleted Tour Successfully!"});
    }),

    updateTour: catchAsync(async (req, res, next) => {
        const tourID = req.params.id;
        const {startDate, endDate, tourguideID, ticketCap, eventID, tourpackageID} = req.body;

        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const tour = await client.query(
            "SELECT TOURGUIDEID FROM TOUR WHERE ID = $1", [tourID]
        );
        let update;
        if(tourguideID === tour.rows[0].tourguideid){
            update = await client.query(
                `UPDATE TOUR SET STARTDATE = $1, ENDDATE = $2, TOURGUIDEID = $3, TICKETCAPACITY = $4, EVENTID = $5, TOURPACKAGEID = $6 WHERE ID = $7 RETURNING *;`,
                [startDate, endDate, tourguideID, ticketCap, eventID || null, tourpackageID || null, tourID]
            );
        }
        else{ //if changed this tour to another guide, make it pending again
            update = await client.query(
                `UPDATE TOUR SET STARTDATE = $1, ENDDATE = $2, TOURGUIDEID = $3, TICKETCAPACITY = $4, EVENTID = $5, TOURPACKAGEID = $6, STATUS = 'pending' WHERE ID = $7 RETURNING *;`,
                [startDate, endDate, tourguideID, ticketCap, eventID || null, tourpackageID || null, tourID]
            );
        }

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
            TR.ENDDATE AS endDate,
            COALESCE(TP.NAME, E.NAME) AS tripName,
            COALESCE(TP.MEETINGLOCATION, E.MEETINGLOCATION) AS meetingLocation,
            COALESCE(TP.DURATION, E.DURATION) AS duration,
            COUNT(TK.ID) AS totalTickets,
            TR.TICKETCAPACITY,
            AVG(F.RATING) AS averageRating
            FROM TOUR TR
            LEFT JOIN TOUR_PACKAGE TP ON TR.TOURPACKAGEID = TP.ID
            LEFT JOIN EVENT E ON TR.EVENTID = E.ID
            LEFT JOIN TICKET TK ON TR.ID = TK.TOURID
            LEFT JOIN TOURIST_FEEDBACK TF ON TR.ID = TF.TOURID
            LEFT JOIN FEEDBACK F ON TF.FEEDBACKID = F.ID
            WHERE TR.TOURGUIDEID = $1 AND TR.STATUS = 'assigned'
            GROUP BY TR.ID, TR.STARTDATE, TP.NAME, TP.MEETINGLOCATION, TP.DURATION, E.NAME, E.MEETINGLOCATION, E.DURATION;`,
            [guideID]
        );

        if(!tours.rowCount) return res.status(404).json({error: "No data found!"});

        return res.status(200).json(tours.rows);
    }),

    getToursThatDidntStart: catchAsync(async (req, res, next) => {
        const tours = await client.query(
            `SELECT TR.ID, TR.TOURPACKAGEID, TR.EVENTID,
            COALESCE(TP.NAME, E.NAME) AS name,
            COALESCE(TP.PRICE, E.PRICE) AS price, 
            TR.TICKETCAPACITY, 
            COUNT(TK.ID) AS bookedTickets,
            TR.STARTDATE
            FROM TOUR TR
            LEFT JOIN TICKET TK ON TK.TOURID = TR.ID
            LEFT JOIN TOUR_PACKAGE TP ON TP.ID = TR.TOURPACKAGEID
            LEFT JOIN EVENT E ON E.ID = TR.EVENTID
            WHERE STARTDATE >= CURRENT_DATE
            GROUP BY TR.ID, TR.TOURPACKAGEID, TR.EVENTID, TR.STARTDATE, TP.NAME, E.NAME, TP.PRICE, E.PRICE, TR.TICKETCAPACITY;`
        );

        if(!tours.rowCount) return res.status(404).json({error: "No data found!"});

        return res.status(200).json(tours.rows);
    }),
    
    getTouristTourHistory: catchAsync(async (req, res, next) => {
        const touristID = req.params.touristid;

        const tours = await client.query(
            `SELECT DISTINCT T.*
            FROM TICKET TK JOIN TOUR T ON TK.TOURID = T.ID
            WHERE TK.TOURISTID = $1;`, [touristID]
        );

        if(!tours.rowCount) return res.status(404).json({error: "No data found!"});

        return res.status(200).json(tours.rows);
    }),

    getPendingToursByGuide: catchAsync(async (req, res, next) => {
        const guideID = req.user.id;

        if(req.role != "guide"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const tours = await client.query(
            `SELECT TR.ID, 
            TR.STARTDATE,
            COALESCE(TP.NAME, E.NAME) AS name,
            TR.TICKETCAPACITY, 
            COUNT(TK.ID) AS bookedTickets
            FROM TOUR TR
            LEFT JOIN TICKET TK ON TK.TOURID = TR.ID
            LEFT JOIN TOUR_PACKAGE TP ON TP.ID = TR.TOURPACKAGEID
            LEFT JOIN EVENT E ON E.ID = TR.EVENTID
            WHERE TR.TOURGUIDEID = $1 AND TR.STATUS = 'pending'
            GROUP BY TR.ID, TR.STARTDATE, TP.NAME, E.NAME, TR.TICKETCAPACITY`,
            [guideID]
        );

        if(!tours.rowCount) return res.status(404).json({error: "No data found!"});

        return res.status(200).json(tours.rows);
    }),

    assignTour: catchAsync(async (req, res, next) => {
        const tourID = req.params.id;

        if(req.role != "guide"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const update = await client.query(
            "UPDATE TOUR SET STATUS = 'assigned' WHERE ID = $1",
            [tourID]
        );

        if(!update.rowCount) return res.status(404).json({error: "Tour doesnt exist!"});

        return res.status(201).json({msg: "Assigned Tour Successfully!"});
    })
};


export default tourController;