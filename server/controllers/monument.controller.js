import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const monumentController = {
    getAllMonuments: catchAsync(async (req, res, next) => {
        //groups all the photos from the monument_photos table into an array when returning
        const allMonuments = await client.query(
            `SELECT ID, NAME, DESCRIPTION, LOCATION, ERA, FAMILY, OPENINGHOURS, ARRAY_AGG(PHOTOS) AS "photos"
            FROM MONUMENT LEFT JOIN MONUMENT_PHOTOS ON ID = MONUMENTID
            GROUP BY ID ORDER BY ID;`
        );

        if(allMonuments.rowCount) return res.status(200).json(allMonuments.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    getMonument: catchAsync(async (req, res, next) => {
        const monumentID = req.params.id;
        
        const monument = await client.query(
            `SELECT ID, NAME, DESCRIPTION, LOCATION, ERA, FAMILY, OPENINGHOURS, ARRAY_AGG(PHOTOS) AS "photos"
            FROM MONUMENT LEFT JOIN MONUMENT_PHOTOS ON ID = MONUMENTID
            WHERE ID = $1
            GROUP BY ID;`,
            [monumentID]
        );

        if(monument.rowCount) return res.status(200).json(monument.rows[0]);

        return res.status(404).json({error: "No data found!"});
    }),
    createMonument: catchAsync(async (req, res, next) => {
        const {name, description, location, era, family, openingHours, photos} = req.body;
        
        // if(req.role != "operator"){
        //     const err = new Error("You are not allowed to do this action!");
        //     err.statusCode = 400;
        //     return next(err);
        // }

        const create = await client.query(
            `INSERT INTO MONUMENT(NAME, DESCRIPTION, LOCATION, ERA, FAMILY, OPENINGHOURS)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`,
            [name, description, location, era, family, openingHours]
        );
        
        for(let i = 0; i < photos.length; i++){
            await client.query("INSERT INTO MONUMENT_PHOTOS VALUES($1, $2);", [create.rows[0].id, photos[i]]);
        }

        return res.status(201).json({msg: "Created Monument Successfully!", data: create.rows});
    }),
    deleteMonument: catchAsync(async (req, res, next) => {
        const monumentID = req.params.id;

        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const del = await client.query(
            "DELETE FROM MONUMENT WHERE ID = $1;",
            [monumentID]
        );

        if(!del.rowCount) return res.status(404).json({ error: "Monument doesnt exist!" });

        return res.status(200).json({msg: "Deleted Monument Successfully!"});
    }),
    updateMonument: catchAsync(async (req, res, next) => {
        const {name, description, location, era, family, openingHours} = req.body;
        const monumentID = req.params.id;
        
        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const update = await client.query(
            `UPDATE MONUMENT SET NAME = $1, DESCRIPTION = $2, LOCATION = $3, ERA = $4, FAMILY = $5, OPENINGHOURS = $5 WHERE ID = $6 RETURNING *;`,
            [name, description, location, era, family, openingHours, monumentID]
        );

        return res.status(201).json({msg: "Updated Monument Successfully!", data: update.rows});
    })
};


export default monumentController;