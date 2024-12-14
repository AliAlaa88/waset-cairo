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

        if(group.rowCount) return res.status(200).json(group.rows[0]);

        return res.status(404).json({error: "No data found!"});
    }),

    createGroup: catchAsync(async (req, res, next) => {
        const {prefferedMonument, commonLanguage, name} = req.body;
        const creatorID = req.user.id;

        if(req.role != "tourist"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
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
        const userID = req.user.id;

        const del = await client.query(
            "DELETE FROM TOURIST_GROUP WHERE ID = $1 AND CREATORID = $2",
            [groupID, userID]
        );

        if(!del.rowCount) return res.status(400).json({error: "You are not allowed to do this action!"});

        return res.status(200).json({msg: "Deleted Tourist Group Successfully!"});
    }),

    joinGroup: catchAsync(async (req, res, next) => {
        const touristID = req.user.id;
        const groupID = req.params.id;

        if(req.role != "tourist"){
            const err = new Error("You are not allowed to do this action!");
            err.statusCode = 400;
            return next(err);
        }

        const join = await client.query(
            "INSERT INTO GROUP_MEMBERS VALUES($1, $2) RETURNING *;",
            [touristID, groupID]
        );

        return res.status(201).json({msg: "Joined Group Successfully!", data: join.rows});
    }),
    
    leaveGroup: catchAsync(async (req, res, next) => {
        const touristID = req.user.id;
        const groupID = req.params.id;
        
        const leave = await client.query(
            "DELETE FROM GROUP_MEMBERS WHERE TOURISTID = $1 AND GROUPID = $2;",
            [touristID, groupID]
        );

        return res.status(200).json({msg: "Left Group Successfully!"});
    }),

    getGroupMembers: catchAsync(async (req, res, next) => {
        const groupID = req.params.id;

        const members = await client.query(
            `SELECT ID, FNAME, LNAME, USERNAME, EMAIL, GENDER, PHONENUMBER, BIRTHDATE, NATIONALITY, LANGUAGE
            FROM TOURIST, GROUP_MEMBERS
            WHERE ID = TOURISTID AND GROUPID = $1;`,
            [groupID]
        );

        if(!members.rowCount) {
            const err = new Error("No data found!");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json(members.rows);
    }),

    getTouristGroups: catchAsync(async (req, res, next) => {
        const touristID = req.params.id;

        const groups = await client.query(
            `SELECT ID, NAME, COMMONLANGUAGE, CREATORID, PREFFEREDMONUMENT
            FROM TOURIST_GROUP, GROUP_MEMBERS
            WHERE ID = GROUPID AND TOURISTID = $1;`,
            [touristID]
        );

        if(!groups.rowCount) {
            const err = new Error("No data found!");
            err.statusCode = 404;
            return next(err);
        }

        return res.status(200).json(groups.rows);
    })
};

export default groupController;