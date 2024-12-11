import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const userController = {
  getAllTourists: catchAsync(async (req, res) => {
    const tourists = await client.query("SELECT * FROM Tourist");
    res.status(200).json({ tourists: tourists.rows });
  }),

  getTourist: catchAsync(async (req, res) => {
    const { touristID } = req.params;
    const tourist = await client.query(
      "SELECT * FROM Tourist WHERE ID = $1",
      [touristID]
    );
    if (!tourist.rows.length)
      return res.status(404).json({ message: "Tourist not found" });
    res.status(200).json({ tourist: tourist.rows[0] });
  }),

  getAllGuides: catchAsync(async (req, res) => {
    const guides = await client.query("SELECT * FROM Tour_Guide");
    res.status(200).json({ guides: guides.rows });
  }),

  getGuide: catchAsync(async (req, res) => {
    const { guideID } = req.params;
    const guide = await client.query(
      "SELECT * FROM Tour_Guide WHERE ID = $1",
      [guideID]
    );
    if (!guide.rows.length)
      return res.status(404).json({ message: "Guide not found" });
    return res.status(200).json({ guide: guide.rows[0] });
  }),
};

export default userController;
