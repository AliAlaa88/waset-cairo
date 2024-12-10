import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const packController = {
    getAllPacks: catchAsync(async (req, res, next) => {
        const allPacks = await client.query(
            "SELECT * FROM TOUR_PACKAGE;"
        );
        
        if(allPacks.rowCount) return res.status(200).json(allPacks.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    getPack: catchAsync(async (req, res, next) => {
        const packID = req.params.id;
        const pack = await client.query(
            "SELECT * FROM TOUR_PACKAGE WHERE ID = $1;",
            [packID]
        );

        if(pack.rowCount) return res.status(200).json(pack.rows);

        return res.status(404).json({error: "No data found!"});
    }),
    createPack: catchAsync(async (req, res, next) => {
        const {name, description, meetingLocation, type, duration, rating, price, opID} = req.body; //opID should be the current logged in operator

        if(!name || !description || !meetingLocation || !type || !duration || !rating || !price || !opID){
            return res.status(404).json({ error: "Missing required fields!" });
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

         //will authenticate that the current logged in operator is the one deleting this pack

        const del = await client.query(
            "DELETE FROM TOUR_PACKAGE WHERE ID = $1;",
            [packID]
        );

        return res.status(200).json({msg: "Deleted Tour Package Successfully!"});
    })
};

export default packController;