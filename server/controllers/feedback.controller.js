import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const feedbackController = {
  getAllFeedbacks: catchAsync(async (req, res) => {
    const feedbacks = await client.query("SELECT * FROM Feedback");
    res.status(200).json({ feedbacks: feedbacks.rows });
  }),

  getFeedback: catchAsync(async (req, res) => {
    const { feedbackID } = req.params;
    const feedback = await client.query(
      "SELECT * FROM Feedback WHERE ID = $1",
      [feedbackID]
    );
    if (!feedback.rows.length)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ feedback: feedback.rows[0] });
  }),

  insertFeedback: catchAsync(async (req, res) => {
    const { description, rating, type } = req.body;
    const newFeedback = await client.query(
      "INSERT INTO Feedback (Description, Type, Rating) VALUES ($1, $2, $3) RETURNING *",
      [description, rating, type]
    );

    const { touristID, tourID } = req.body;
    await client.query(
      "INSERT INTO Tourist_Feedback (TouristID, TourID, FeedbackID) VALUES ($1, $2, $3)",
      [touristID, tourID, newFeedback.rows[0].ID]
    )

    res.status(201).json({ message: "Feedback created", feedback: newFeedback.rows[0] });
  }),
};

export default feedbackController;
