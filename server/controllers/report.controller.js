import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const reportController = {
  getAllReports: catchAsync(async (req, res) => {
    const reports = await client.query("SELECT * FROM Report");
    res.status(200).json({ reports: reports.rows });
  }),

  getReport: catchAsync(async (req, res) => {
    const { reportID } = req.params;
    const report = await client.query(
      "SELECT * FROM Report WHERE ID = $1",
      [reportID]
    );
    if (!report.rows.length)
      return res.status(404).json({ message: "Report not found" });
    res.status(200).json({ report: report.rows[0] });
  }),

  insertReport: catchAsync(async (req, res) => {
    const { reportID, description } = req.body;
    const dateCreated = new Date();
    const newReport = await client.query(
      "INSERT INTO Report (ID, Description, DateCreated) VALUES ($1, $2, $3)",
      [reportID, description, dateCreated]
    );

    const { guideID, tourID } = req.body;
    await client.query(
      "INSERT INTO Guide Report (GuideID, TourID, FeedbackID) VALUES ($1, $2, $3)",
      [guideID, tourID, reportID]
    )

    res.status(201).json({ message: "Report created", report: newReport.rows[0] });
  }),
};

export default reportController;
