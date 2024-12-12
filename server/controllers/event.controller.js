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
        const {name, description, meetingLocation, type, duration, rating, price} = req.body;
        const opID = req.user.id;

        if(req.role != "operator") return res.status(400).json({error: "You are not allowed to do this action!"});

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
        const opID = req.user.id;

        if(req.role != "operator") return res.status(400).json({error: "You are not allowed to do this action!"});

        const del = client.query(
            "DELETE FROM EVENT WHERE ID = $1 AND OPERATORID = $2;",
            [eventID, opID]
        );

        if(!del.rowCount) return res.status(400).json({error: "You are not allowed to do this action!"});

        return res.status(200).json({msg: "Deleted Event Successfully!"});
    })
};

export default eventController;