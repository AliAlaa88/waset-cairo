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
};


export default monumentController;