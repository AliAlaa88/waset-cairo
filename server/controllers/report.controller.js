import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const reportController = {
  getAllReports: catchAsync(async (req, res) => {
    const reports = await client.query("SELECT * FROM Report");

    if(!reports.rowCount){
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({ reports: reports.rows });
  }),

  getReport: catchAsync(async (req, res) => {
    const { reportID } = req.params;
    const report = await client.query(
      "SELECT * FROM Report WHERE ID = $1",
      [reportID]
    );

    if (!report.rowCount){
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({ report: report.rows[0] });
  }),

  insertReport: catchAsync(async (req, res) => {
    const { description } = req.body;
    const guideID = req.user.id;
    const tourID = req.params.id;

    if(req.role != "guide"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

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
