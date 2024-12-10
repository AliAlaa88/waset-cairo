import catchAsync from "../utils/catchAsync";

const feedbackController = {
  getAllFeedbacks: catchAsync(async (req, res) => {
    const feedbacks = await client.query("SELECT * FROM Feedback");
    res.status(200).json({ feedbacks: feedbacks.rows });
  }),

  getFeedback: catchAsync(async (req, res) => {
    const { feedbackID } = req.params;
    const feedback = await client.query(
      "SELECT * FROM Feedback WHERE FeedbackID = $1",
      [feedbackID]
    );
    if (!feedback.rows.length)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ feedback: feedback.rows[0] });
  }),

  insertFeedback: catchAsync(async (req, res) => {}),
};

export default feedbackController;
