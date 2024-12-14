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

  getGuideReports: catchAsync(async (req, res, next) => {
    const guideID = req.params.id;

    const reports = await client.query(
      `SELECT ID, DESCRIPTION, DATECREATED, TOURID
      FROM REPORT, GUIDE_REPORT
      WHERE ID = REPORTID AND GUIDEID = $1;`,
      [guideID]
    );

    if(!reports.rowCount) {
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json(reports.rows);
  }),

  getTourReports: catchAsync(async (req, res, next) => {
    const tourID = req.params.id;

    const reports = await client.query(
      `SELECT ID, DESCRIPTION, DATECREATED, GUIDEID
      FROM REPORT, GUIDE_REPORT
      WHERE ID = REPORTID AND TOURID = $1;`,
      [tourID]
    );

    if(!reports.rowCount) {
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json(reports.rows);
  }),

  deleteReport: catchAsync(async (req, res, next) => {
    const reportID = req.params.id;

    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const del = await client.query(
      "DELETE FROM REPORT WHERE ID = $1;",
      [reportID]
    );

    if(!del.rowCount){
      const err = new Error("Report doesnt exist!");
      err.statusCode = 404;
      return next(err);
    }

    return res.status(200).json({msg: "Deleted Report Successfully!"});
  })
};

export default reportController;
