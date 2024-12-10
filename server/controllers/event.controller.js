import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const eventController = {
    getAllEvents: catchAsync(async (req, res, next) => {
        const allEvents = await client.query(
            "SELECT * FROM EVENT;"
        );

        if(allEvents.rowCount) return res.status(200).json(allEvents.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    getEvent: catchAsync(async (req, res, next) => {
        const eventID = req.params.id;
        const event = await client.query(
            "SELECT * FROM EVENT WHERE ID = $1;",
            [eventID]
        );

        if(event.rowCount) return res.status(200).json(event.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    createEvent: catchAsync(async (req, res, next) => {
        //exactly the same as packages
        const {name, description, meetingLocation, type, duration, rating, price, opID} = req.body;

        if(!name || !description || !meetingLocation || !type || !duration || !rating || !price || !opID){
            return res.status(404).json({ error: "Missing required fields!" });
        }

        const create = await client.query(
            `INSERT INTO EVENT(NAME, DESCRIPTION, MEETINGLOCATION, TYPE, DURATION, RATING, PRICE, OPERATORID)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
            [name, description, meetingLocation, type, duration, rating, price, opID]
        );

        return res.status(201).json({msg: "Created Event Successfully!", data: create.rows});

    }),
    deleteEvent: catchAsync(async (req, res, next) => {
        const eventID = req.params.id;
        const del = client.query(
            "DELETE FROM EVENT WHERE ID = $1;",
            [eventID]
        );

        return res.status(200).json({msg: "Deleted Event Successfully!"});
    })
};

export default eventController;