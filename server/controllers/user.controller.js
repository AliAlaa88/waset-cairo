import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const userController = {
  getAllTourists: catchAsync(async (req, res) => {
    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const tourists = await client.query("SELECT * FROM Tourist");

    if(!tourists){
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }
    
    res.status(200).json({ tourists: tourists.rows });
  }),

  getTourist: catchAsync(async (req, res) => {
    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const { touristID } = req.params;
    const tourist = await client.query(
      "SELECT * FROM Tourist WHERE ID = $1",
      [touristID]
    );

    if (!tourist.rowCount){
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({ tourist: tourist.rows[0] });
  }),

  getAllGuides: catchAsync(async (req, res) => {
    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const guides = await client.query("SELECT * FROM Tour_Guide");

    if(!guides){
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({ guides: guides.rows });
  }),

  getGuide: catchAsync(async (req, res) => {
    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const { guideID } = req.params;
    const guide = await client.query(
      "SELECT * FROM Tour_Guide WHERE ID = $1",
      [guideID]
    );

    if (!guide.rowCount){
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }
    
    return res.status(200).json({ guide: guide.rows[0] });
  }),
  promoteTourist: catchAsync(async (req, res, next) =>{
    const touristID = req.params.id;

    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const del = await client.query(
      "DELETE FROM TOURIST WHERE ID = $1 RETURNING *;",
      [touristID]
    );

    if(!del.rowCount) return res.status(404).json({error: "User doesnt exist!"}); 

    const add = await client.query(
      "INSERT INTO Tour_Operator(FName, LName, UserName, Email, Password, Gender, PhoneNumber, BirthDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			[del.rows[0].fname, del.rows[0].lname, del.rows[0].username, del.rows[0].email, del.rows[0].password, del.rows[0].gender, del.rows[0].phonenumber, del.rows[0].birthdate]
    ); 

    return res.status(201).json({msg: "User has been promoted to an operator!"});
  }),
  promoteGuide: catchAsync(async (req, res, next) => {
    const guideID = req.params.id;

    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const del = await client.query(
      "DELETE FROM TOUR_GUIDE WHERE ID = $1 RETURNING *;",
      [guideID]
    );

    if(!del.rowCount) return res.status(404).json({error: "User doesnt exist!"}); 

    const add = await client.query(
      "INSERT INTO Tour_Operator(FName, LName, UserName, Email, Password, Gender, PhoneNumber, BirthDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			[del.rows[0].fname, del.rows[0].lname, del.rows[0].username, del.rows[0].email, del.rows[0].password, del.rows[0].gender, del.rows[0].phonenumber, del.rows[0].birthdate]
    ); 

    return res.status(201).json({msg: "User has been promoted to an operator!"});
  }),
  banTourist: catchAsync(async (req, res, next) => {
    const touristID = req.params.id;

    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const ban = await client.query(
      "UPDATE TOURIST SET BANNED = '1' WHERE ID = $1;",
      [touristID]
    )

    if(!ban.rowCount) return res.status(404).json({error: "User doesnt exist!"}); 

    return res.status(201).json({msg: "User has been banned successfully!"});
  }),
  getTouristFavExperience: catchAsync(async (req, res, next) => {
    const touristID = req.params.id;

    const fav = await client.query(
      `SELECT COALESCE(TP.NAME, E.NAME) AS experienceName,
      T.STARTDATE AS date,
      F.RATING AS highestRating
      FROM FEEDBACK F
      JOIN TOUR T ON F.TOURID = T.ID
      LEFT JOIN TOUR_PACKAGE TP ON T.TOURPACKAGEID = TP.ID
      LEFT JOIN EVENT E ON T.EVENTID = E.ID
      WHERE F.TOURISTID = $1 AND F.RATING = (
        SELECT MAX(RATING)
        FROM FEEDBACK
        WHERE TOURISTID = $1
      );`, [touristID]
    );

    if(!fav.rowCount) return res.status(404).json({error: "No data found!"});

    return res.status(200).json(fav.rows[0]);
  }),

  getOperatorPackages: catchAsync(async (req, res, next) => {
    const opID = req.params.opid;
    const packs = await client.query(
      "SELECT * FROM TOUR_PACKAGE WHERE OPERATORID = $1",
      [opID]
    );

    if(!packs.rowCount) return res.status(404).json({error: "No data found!"});

    return res.status(200).json(packs.rows);
  }),

  getOperatorEvents: catchAsync(async (req, res, next) => {
    const opID = req.params.opid;
    const events = await client.query(
      "SELECT * FROM EVENT WHERE OPERATORID = $1",
      [opID]
    );

    if(!events.rowCount) return res.status(404).json({error: "No data found!"});

    return res.status(200).json(events.rows);
  }),

  getTouristInsights: catchAsync(async (req, res, next) => {
    const id = req.params.touristid;
    const insights = await client.query( //apparently joinDate is a reserved keyword in pg.
      `SELECT COUNT(DISTINCT TK.TOURID) AS totalTrips, 
      SUM(TK.PRICE) AS totalSpent,      
      T."joinDate" AS memberSince
      FROM TOURIST T
      LEFT JOIN TICKET TK ON T.ID = TK.TOURISTID                 
      WHERE T.ID = $1                                      
      GROUP BY T.ID, T."joinDate";`, [id]
    );

    if(!insights.rowCount) return res.status(404).json({error: "No data found!"});

    return res.status(200).json(insights.rows);
  })
};

export default userController;
