import catchAsync from "../utils/catchAsync.js";
import client from "../dbConfig.js";

const ticketController = {
  getUserTickets: catchAsync(async (req, res) => {
    const { touristID } = req.body;
    const tickets = await client.query(
      "SELECT * FROM Ticket WHERE TouristID = $1",
      [touristID]
    );

    if(!tickets){
      const err = new Error("No data found!");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({ tickets: tickets.rows });
  }),

  insertTicket: catchAsync(async (req, res, next) => {
    const { price } = req.body;
    const touristID = req.user.id;
    const tourID = req.params.id;

    if(req.role != "tourist"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const ticket = await client.query(
      "INSERT INTO Ticket(TouristID, TourID, Price) VALUES ($1, $2, $3)",
      [touristID, tourID, price]
    );
    
    res.status(201).json({ message: "Ticket created" });
  }),
};

export default ticketController;
