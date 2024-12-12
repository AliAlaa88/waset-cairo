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
    const { description } = req.body;
    const guideID = req.user.id;
    const tourID = req.params.id;

    if(req.role != "guide") return res.status(400).json({error: "You are not allowed to do this action!"});

    const newReport = await client.query(
      "INSERT INTO Report (Description) VALUES ($1) RETURNING *",
      [description]
    );

    const insert = await client.query(
      "INSERT INTO Guide_Report (GuideID, TourID, ReportID) VALUES ($1, $2, $3)",
      [guideID, tourID, newReport.rows[0].id]
    );

    res.status(201).json({ message: "Report created", report: newReport.rows[0] });
  }),
};

export default reportController;
