import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const userController = {
  getAllTourists: catchAsync(async (req, res) => {
    const tourists = await client.query("SELECT * FROM Tourist");
    res.status(200).json({ tourists: tourists.rows });
  }),

  getAllGuides: catchAsync(async (req, res) => {
    const guides = await client.query("SELECT * FROM Tour_Guide");
    res.status(200).json({ guides: guides.rows });
  }),
};

export default userController;
