import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const groupController = {

    getAllGroups: catchAsync(async (req, res, next) => {
        const allGroups = await client.query(
            "SELECT * FROM TOURIST_GROUP;"
        );

        if(allGroups.rowCount) return res.status(200).json(allGroups.rows);

        return res.status(404).json({error: "No data found!"});
    }),

    getGroup: catchAsync(async (req, res, next) => {
        const groupID = req.params.id;
        const group = await client.query(
            "SELECT * FROM TOURIST_GROUP WHERE ID = $1",
            [groupID]
        );

        if(group.rowCount) return res.status(200).json(group.rows);

        return res.status(404).json({error: "No data found!"});
    }),

    createGroup: catchAsync(async (req, res, next) => {
        const {prefferedMonument, commonLanguage, name, creatorID} = req.body;

        if(!commonLanguage || !name || !creatorID){
            return res.status(404).json({error: "Missing required fields!"});
        }

        const create = await client.query(
            `INSERT INTO TOURIST_GROUP(PREFFEREDMONUMENT, COMMONLANGUAGE, NAME, CREATORID)
            VALUES($1, $2, $3, $4) RETURNING *;`,
            [prefferedMonument, commonLanguage, name, creatorID]
        );

        return res.status(201).json({msg: "Created Tourist Group Successfully!", data: create.rows});

    }),

    deleteGroup: catchAsync(async (req, res, next) => {
        const groupID = req.params.id;
        const del = await client.query(
            "DELETE FROM TOURIST_GROUP WHERE ID = $1",
            [groupID]
        );

        return res.status(200).json({msg: "Deleted Tourist Group Successfully!"});
    }),

    joinGroup: catchAsync(async (req, res, next) => {
        const {touristID} = req.body; //will replace with current logged in user
        const groupID = req.params.id;

        if(!touristID) return res.status(404).json({error: "Missing required field!"});

        const join = client.query(
            "INSERT INTO GROUP_MEMBERS VALUES($1, $2) RETURNING *;",
            [touristID, groupID]
        );

        return res.status(201).json({msg: "Joined Group Successfully!", data: join.rows});
        
    }),
    
    leaveGroup: catchAsync(async (req, res, next) => {
        const {touristID} = req.body; //will replace with current logged in user
        const groupID = req.params.id;

        if(!touristID) return res.status(404).json({error: "Missing required field!"});

        const leave = client.query(
            "DELETE FROM GROUP_MEMBERS WHERE TOURISTID = $1 AND GROUPID = $2;",
            [touristID, groupID]
        );

        return res.status(200).json({msg: "Left Group Successfully!"});
    }),
};

export default groupController;