import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const userController = {
  getAllTourists: catchAsync(async (req, res, next) => {
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
    
    res.status(200).json(tourists.rows);
  }),

  getTourist: catchAsync(async (req, res, next) => {
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

    res.status(200).json(tourist.rows[0]);
  }),

  getAllGuides: catchAsync(async (req, res, next) => {
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

    res.status(200).json(guides.rows);
  }),

  getGuide: catchAsync(async (req, res, next) => {

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
    
    return res.status(200).json(guide.rows[0]);
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

  unbanTourist: catchAsync(async (req, res, next) => {
    const touristID = req.params.id;

    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const unban = await client.query(
      "UPDATE TOURIST SET BANNED = '0' WHERE ID = $1;",
      [touristID]
    )

    if(!unban.rowCount) return res.status(404).json({error: "User doesnt exist!"}); 

    return res.status(201).json({msg: "User has been unbanned successfully!"});
  }),
  getTouristFavExperience: catchAsync(async (req, res, next) => {
    const touristID = req.params.id;

    const fav = await client.query(
      `SELECT COALESCE(TP.NAME, E.NAME) AS experienceName,
      TR.STARTDATE AS date,
      F.RATING AS highestRating
      FROM TOUR TR
      LEFT JOIN TOURIST_FEEDBACK TF ON TF.TOURID = TR.ID
      LEFT JOIN FEEDBACK F ON F.ID = TF.FEEDBACKID
      LEFT JOIN TOUR_PACKAGE TP ON TP.ID = TR.TOURPACKAGEID
      LEFT JOIN EVENT E ON E.ID = TR.EVENTID
      WHERE TF.TOURISTID = $1 AND F.RATING = (
        SELECT MAX(RATING)
        FROM FEEDBACK
        WHERE TF.TOURISTID = $1
      );`, [touristID]
    );

    if(!fav.rowCount) return res.status(404).json({error: "No data found!"});

    return res.status(200).json(fav.rows[0]);
  }),

  getOperatorPackages: catchAsync(async (req, res, next) => {
    const opID = req.user.id;
    const packs = await client.query(
      "SELECT * FROM TOUR_PACKAGE WHERE OPERATORID = $1",
      [opID]
    );

    if(!packs.rowCount) return res.status(404).json({error: "No data found!"});

    return res.status(200).json(packs.rows);
  }),

  getOperatorEvents: catchAsync(async (req, res, next) => {
    const opID = req.user.id;
    const events = await client.query(
      "SELECT * FROM EVENT WHERE OPERATORID = $1",
      [opID]
    );

    if(!events.rowCount) return res.status(404).json({error: "No data found!"});

    return res.status(200).json(events.rows);
  }),

  getTouristInsights: catchAsync(async (req, res, next) => {
    const id = req.user.id;

    if(req.role != "tourist"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

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

    return res.status(200).json(insights.rows[0]);
  }),

  getTouristsGoingToGuideTours: catchAsync(async (req, res, next) => {
    const guideID = req.params.id;

    if(req.role != "guide"){
        const err = new Error("You are not allowed to do this action!");
        err.statusCode = 400;
        return next(err);
    }

    const tourists = await client.query(
      `SELECT DISTINCT T.ID, T.FNAME, T.LNAME, T.USERNAME, T.EMAIL, T.PHONENUMBER, TK.TOURID, TR.STARTDATE, COALESCE(TP.NAME, E.NAME) AS tripName
      FROM TOURIST T
      JOIN TICKET TK ON T.ID = TK.TOURISTID
      JOIN TOUR TR ON TK.TOURID = TR.ID
      LEFT JOIN TOUR_PACKAGE TP ON TP.ID = TR.TOURPACKAGEID
      LEFT JOIN EVENT E ON E.ID = TR.EVENTID
      WHERE TR.TOURGUIDEID = $1 AND TR.STARTDATE > CURRENT_DATE;`, [guideID]
    )

    if(!tourists.rowCount) return res.status(404).json({error: "No data found!"});

    return res.status(200).json(tourists.rows);
  }),

  getCurrUserData: catchAsync(async (req, res, next) => {
    const currUserID = req.user.id;
    const role = req.role === "operator"? "Tour_Operator" : req.role === "guide"? "Tour_Guide" : "Tourist";

    const data = await client.query(
      `SELECT * FROM ${role} WHERE ID = $1;`,
      [currUserID]
    );

    return res.status(200).json(data.rows[0]);
  }),

  getOperatorDashboard: catchAsync(async (req, res, next) => {

    const data = await client.query(
      `SELECT COUNT(DISTINCT TR.ID) AS totalTours,
      COUNT(DISTINCT T.ID) AS totalCustomers,
      COUNT(DISTINCT TG.ID) AS totalGuides,
      SUM(TK.PRICE) AS totalRevenue
      FROM TOUR TR
      JOIN TICKET TK ON TK.TOURID = TR.ID
      JOIN TOURIST T ON T.ID = TK.TOURISTID
      JOIN TOUR_GUIDE TG ON TG.ID = TR.TOURGUIDEID;`
    );

    if(!data.rowCount) return res.status(404).json({error: "No data found!"});

    return res.status(200).json(data.rows[0]);
  }),

  getTopPerformingGuides: catchAsync(async (req, res, next) => {
    const data = await client.query(
      `SELECT G.ID AS id,
      G.FNAME AS fname,
      G.LNAME AS lname,
      COUNT(T.ID) AS totalTours,
      COALESCE(AVG(F.RATING), 0) AS rating
      FROM TOUR_GUIDE G
      LEFT JOIN TOUR T ON G.ID = T.TOURGUIDEID
      LEFT JOIN TOURIST_FEEDBACK TF ON TF.TOURID = T.ID 
      LEFT JOIN FEEDBACK F ON F.ID = TF.FEEDBACKID AND F.TYPE = 'Tour Guide'
      GROUP BY G.ID, G.FNAME, G.LNAME
      HAVING COUNT(T.ID) > 0
      ORDER BY rating DESC, totalTours DESC LIMIT 5;`
    )
    return res.status(200).json(data.rows);
  }),

  getTouristsDemographics: catchAsync(async (req, res, next) => {
    const data = await client.query(
      `SELECT EXTRACT(YEAR FROM AGE(birthdate)) AS age,
      COALESCE(AVG(TK.PRICE), 0) as avgSpent,
      COUNT(DISTINCT T.ID) AS count
      FROM TOURIST T
      LEFT JOIN TICKET TK ON TK.TOURISTID = T.ID
      GROUP BY EXTRACT(YEAR FROM AGE(birthdate));`
    )
    return res.status(200).json(data.rows);
  })
};

export default userController;
