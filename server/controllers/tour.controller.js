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
        const {startDate, endDate, ticketCap, opID, eventID, tourpackageID} = req.body;

        //commented this out for now. it will authenticate that the current user is an operator.
        // const role = req.body.role;
        // const opID = req.user.id;

        // if(role != "operator") return res.status(401).json({msg: "Unauthorized Access"});
        if (!startDate || !endDate || !ticketCap || !opID || (!eventID && !tourpackageID)) {
            return res.status(404).json({ error: "Missing required fields!" });
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
        // const opID = req.user.id; //will authenticate that the current user is the operator that created this tour
        const del = await client.query(
            "DELETE FROM TOUR WHERE ID = $1;",
            [tourID]
        );
        res.status(200).json({msg: "Deleted Tour Successfully!"});
    })
};


export default tourController;