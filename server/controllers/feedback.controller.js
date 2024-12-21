import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const feedbackController = {
  getAllFeedbacks: catchAsync(async (req, res, next) => {
    const feedbacks = await client.query("SELECT * FROM Feedback");
    res.status(200).json({ feedbacks: feedbacks.rows });
  }),

  getFeedback: catchAsync(async (req, res, next) => {
    const { feedbackID } = req.params;
    const feedback = await client.query(
      "SELECT * FROM Feedback WHERE ID = $1",
      [feedbackID]
    );
    if (!feedback.rowCount){
      const err = new Error("Feedback not found!");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({ feedback: feedback.rows[0] });
  }),

  insertFeedback: catchAsync(async (req, res, next) => {
    const { description, rating, type, tourID } = req.body;
    const touristID = req.user.id;
    
    if(req.role != "tourist"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const newFeedback = await client.query(
      "INSERT INTO Feedback (Description, Type, Rating) VALUES ($1, $2, $3) RETURNING *",
      [description, type, parseFloat(rating)]
    );

    const insert = await client.query(
      "INSERT INTO Tourist_Feedback (TouristID, TourID, FeedbackID) VALUES ($1, $2, $3)",
      [touristID, tourID, newFeedback.rows[0].id]
    );

    res.status(201).json({ message: "Feedback created", feedback: newFeedback.rows[0] });
  }),
  getTouristFeedback: catchAsync(async (req, res, next) => {
    const touristID = req.params.id;

    const feedbacks = await client.query(
      `SELECT ID, DESCRIPTION, TYPE, RATING, DATECREATED, TOURID
      FROM FEEDBACK, TOURIST_FEEDBACK
      WHERE ID = FEEDBACKID AND TOURISTID = $1;`,
      [touristID]
    );

    if(!feedbacks.rowCount) {
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json(feedbacks.rows);
  }),
  getTourFeedback: catchAsync(async (req, res, next) => {
    const tourID = req.params.id;

    const feedbacks = await client.query(
      `SELECT ID, DESCRIPTION, TYPE, RATING, DATECREATED, TOURISTID
      FROM FEEDBACK, TOURIST_FEEDBACK
      WHERE ID = FEEDBACKID AND TOURID = $1;`,
      [tourID]
    );

    if(!feedbacks.rowCount) {
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json(feedbacks.rows);
  }),

  deleteFeedback: catchAsync(async (req, res, next) => {
    const feedbackID = req.params.id;

    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const del = await client.query(
      "DELETE FROM FEEDBACK WHERE ID = $1;",
      [feedbackID]
    );

    if(!del.rowCount){
      const err = new Error("Feedback doesnt exist!");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json({msg: "Deleted feedback successfully!"});
  }),

  getRatingsOfTourists: catchAsync(async(req, res, next) => {
    const touristID = req.user.id;

    const data = await client.query(
      `SELECT
      F.TYPE,
      COUNT(F.RATING) AS ratingcount,
      AVG(F.RATING) AS avgRating
      FROM FEEDBACK F
      JOIN TOURIST_FEEDBACK TF ON TF.FEEDBACKID = F.ID
      WHERE TF.TOURISTID = $1
      GROUP BY F.TYPE
      ORDER BY F.TYPE`, [touristID]
    );

    return res.status(200).json(data.rows);
  })
};

export default feedbackController;
