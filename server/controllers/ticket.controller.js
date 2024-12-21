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
    const { price, tourID } = req.body;
    const touristID = req.user.id;
    console.log(price, touristID, tourID)

    if(req.role != "tourist"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const capacity = await client.query(
      `SELECT TR.TICKETCAPACITY,
      COUNT(TK.ID) AS tickets
      FROM TOUR TR JOIN TICKET TK ON TR.ID = TK.TOURID 
      WHERE TR.ID = $1
      GROUP BY TR.ID, TR.TICKETCAPACITY`,
      [tourID]
    );

    // if(capacity.rows[0].ticketcapacity === capacity.rows[0].tickets) return res.status(404).json({error: "Tour is currently on full capacity!"});

    const ticket = await client.query(
      "INSERT INTO Ticket(TouristID, TourID, Price) VALUES ($1, $2, $3)",
      [touristID, tourID, price]
    );
    
    res.status(201).json({ message: "Ticket created" });
  }),

  updateTicket: catchAsync(async (req, res, next) => {
    const { price } = req.body;
    const touristID = req.user.id;
    const tourID = req.params.id;

    const ticket = await client.query(
      "UPDATE Ticket SET PRICE = $1 WHERE TOURISTID = $2 AND TOURID = $3 RETURNING *;",
      [price, touristID, tourID]
    );

    if(!ticket.rowCount){
      const err = new Error("Ticket doesnt exist!");
      err.statusCode = 404;
      return next(err);
    }
    
    res.status(200).json({ message: "Ticket updated!", data: ticket.rows });
  }),

  deleteTicket: catchAsync(async (req, res, next) => {
    const ticketID = req.params.id;

    if(req.role != "operator"){
      const err = new Error("You are not allowed to do this action!");
      err.statusCode = 400;
      return next(err);
    }

    const del = await client.query(
      "DELETE FROM TICKET WHERE ID = $1;",
      [ticketID]
    );

    return res.status(200).json({msg: "Deleted Ticket Successfully!"});
  })
};

export default ticketController;
