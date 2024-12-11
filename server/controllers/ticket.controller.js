import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const ticketController = {
  getUserTickets: catchAsync(async (req, res) => {
    const { touristID } = req.body;
    const tickets = await client.query(
      "SELECT * FROM Ticket WHERE TouristID = $1",
      [touristID]
    );
    res.status(200).json({ tickets: tickets.rows });
  }),

  insertTicket: catchAsync(async (req, res, next) => {
    const { touristId, tourID, price } = req.body;
    const ticket = await client.query(
      "INSERT INTO Ticket(TouristID, TourID, Price) VALUES ($1, $2, $3)",
      [touristId, tourID, price]
    );
    if (!ticket)
      return res.status(400).json({ message: "Ticket not created" });
    res.status(201).json({ message: "Ticket created" });
  }),
};

export default ticketController;
