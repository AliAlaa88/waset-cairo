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
    })
};


export default tourController;