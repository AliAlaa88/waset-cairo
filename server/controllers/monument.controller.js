import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const monumentController = {
    getAllMonuments: catchAsync(async (req, res, next) => {
        const allMonuments = await client.query(
            "SELECT * FROM MONUMENT;"
        );

        if(allMonuments.rowCount) return res.status(200).json(allMonuments.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    getMonument: catchAsync(async (req, res, next) => {
        const monumentID = req.params.id;
        const monument = await client.query(
            "SELECT * FROM MONUMENT WHERE ID = $1;",
            [monumentID]
        );

        if(monument.rowCount) return res.status(200).json(monument.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    createMonument: catchAsync(async (req, res, next) => {
        const {name, description, location, era, family, openingHours} = req.body;
        
        if(req.role != "operator"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const create = await client.query(
            `INSERT INTO MONUMENT(NAME, DESCRIPTION, LOCATION, ERA, FAMILY, OPENINGHOURS)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`,
            [name, description, location, era, family, openingHours]
        );

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
    })
};


export default monumentController;