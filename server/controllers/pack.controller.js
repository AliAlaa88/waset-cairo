import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const packController = {
    getAllPacks: catchAsync(async (req, res, next) => {
        const allPacks = await client.query(
            `SELECT ID, NAME, DESCRIPTION, MEETINGLOCATION, TYPE, DURATION, RATING, PRICE, ARRAY_AGG(MONUMENTID) AS "monument ids"
            FROM TOUR_PACKAGE LEFT JOIN PACKAGE_MONUMENT ON ID = PACKAGEID
            GROUP BY ID ORDER BY ID;`
        );
        
        if(allPacks.rowCount) return res.status(200).json(allPacks.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    getPack: catchAsync(async (req, res, next) => {
        const packID = req.params.id;
        const pack = await client.query(
            `SELECT ID, NAME, DESCRIPTION, MEETINGLOCATION, TYPE, DURATION, RATING, PRICE, ARRAY_AGG(MONUMENTID) AS "monument ids"
            FROM TOUR_PACKAGE LEFT JOIN PACKAGE_MONUMENT ON ID = PACKAGEID
            WHERE ID = $1
            GROUP BY ID;`,
            [packID]
        );

        if(pack.rowCount) return res.status(200).json(pack.rows[0]);

        return res.status(404).json({error: "No data found!"});
    }),
    createPack: catchAsync(async (req, res, next) => {
        const {name, description, meetingLocation, type, duration, rating, price} = req.body;
        const opID = req.user.id;

        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const create = await client.query(
            `INSERT INTO TOUR_PACKAGE(NAME, DESCRIPTION, MEETINGLOCATION, TYPE, DURATION, RATING, PRICE, OPERATORID)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
            [name, description, meetingLocation, type, duration, rating, price, opID]
        );

        return res.status(201).json({msg: "Created Tour Package Successfully!", data: create.rows});
    }),
    deletePack: catchAsync(async (req, res, next) => {
        const packID = req.params.id;
        const opID = req.user.id;

        //make sure an operator is requesting this
        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }
        
        //check if the current logged in operator is the one that owns this package to allow deletion
        const del = await client.query(
            "DELETE FROM TOUR_PACKAGE WHERE ID = $1 AND OPERATORID = $2;",
            [packID, opID]
        );

        //found none
        if(!del.rowCount) return res.status(400).json({error: "You are not allowed to do this!"});

        return res.status(200).json({msg: "Deleted Tour Package Successfully!"});
    }),

    updatePack: catchAsync(async (req, res, next) => {
        const packID = req.params.id;
        const {name, description, meetingLocation, type, duration, rating, price} = req.body;
        
        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const update = await client.query(
            `UPDATE TOUR_PACKAGE SET NAME = $1, DESCRIPTION = $2, MEETINGLOCATION = $3, TYPE = $4, DURATION = $5, RATING = $6, PRICE = $7
            WHERE ID = $8 RETURNING *;`,
            [name, description, meetingLocation, type, duration, rating, price, packID]
        );

        if(!update.rowCount){
            const err = new Error("Event doesnt exist!");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json({msg: "Updated Tour Package Successfully!", data: update.rows});
    })
};

export default packController;