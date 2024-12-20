import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const eventController = {
    getAllEvents: catchAsync(async (req, res, next) => {
        const allEvents = await client.query(
            `SELECT ID, NAME, DESCRIPTION, MEETINGLOCATION, TYPE, DURATION, RATING, PRICE, ARRAY_AGG(MONUMENTID) AS "monumentids"
            FROM EVENT LEFT JOIN EVENT_MONUMENT ON ID = EVENTID
            GROUP BY ID ORDER BY ID;`
        );

        if(allEvents.rowCount) return res.status(200).json(allEvents.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    getEvent: catchAsync(async (req, res, next) => {
        const eventID = req.params.id;
        const event = await client.query(
            `SELECT ID, NAME, DESCRIPTION, MEETINGLOCATION, TYPE, DURATION, RATING, PRICE, ARRAY_AGG(MONUMENTID) AS "monumentids"
            FROM EVENT LEFT JOIN EVENT_MONUMENT ON ID = EVENTID
            WHERE ID = $1
            GROUP BY ID;`,
            [eventID]
        );

        if(event.rowCount) return res.status(200).json(event.rows[0]);

        return res.status(404).json({error: "No data found!"});
    }),
    createEvent: catchAsync(async (req, res, next) => {
        const {name, description, meetingLocation, type, duration, rating, price, monumentids} = req.body;
        const opID = req.user.id;

        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const create = await client.query(
            `INSERT INTO EVENT(NAME, DESCRIPTION, MEETINGLOCATION, TYPE, DURATION, RATING, PRICE, OPERATORID)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
            [name, description, meetingLocation, type, duration, rating, price, opID]
        );

        for(const i = 0; i < monumentids.length; i++){
            await client.query(
                "INSERT INTO EVENT_MONUMENT VALUES($1, $2);", 
                [create.rows.id, monumentids[i]]
            );
        }

        return res.status(201).json({msg: "Created Event Successfully!", data: create.rows});

    }),
    deleteEvent: catchAsync(async (req, res, next) => {
        const eventID = req.params.id;
        const opID = req.user.id;

        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const del = await client.query(
            "DELETE FROM EVENT WHERE ID = $1 AND OPERATORID = $2;",
            [eventID, opID]
        );

        if(!del.rowCount) return res.status(400).json({error: "You are not allowed to do this action!"});

        return res.status(200).json({msg: "Deleted Event Successfully!"});
    }),

    updateEvent: catchAsync(async (req, res, next) => {
        const eventID = req.params.id;
        const {name, description, meetingLocation, type, duration, rating, price} = req.body;
        
        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const update = await client.query(
            `UPDATE EVENT SET NAME = $1, DESCRIPTION = $2, MEETINGLOCATION = $3, TYPE = $4, DURATION = $5, RATING = $6, PRICE = $7
            WHERE ID = $8 RETURNING *;`,
            [name, description, meetingLocation, type, duration, rating, price, eventID]
        );

        if(!update.rowCount){
            const err = new Error("Event doesnt exist!");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json({msg: "Updated Event Successfully!", data: update.rows});
    })
};

export default eventController;