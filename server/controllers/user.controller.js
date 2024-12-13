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
};

export default userController;
