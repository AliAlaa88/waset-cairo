import { Router } from 'express';
import ticketController from '../controllers/ticket.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'; 
const ticketRouter = Router();

ticketRouter.get('/', authMiddleware, ticketController.getUserTickets);
ticketRouter.post('/', authMiddleware, ticketController.insertTicket);

export default ticketRouter