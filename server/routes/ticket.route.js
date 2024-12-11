import { Router } from 'express';
import ticketController from '../controllers/ticket.controller';
import authMiddleware from '../middlewares/auth.middleware';
const ticketRouter = Router();

ticketRouter.get('/', authMiddleware, ticketController.getUserTickets);
ticketRouter.post('/', authMiddleware, ticketController.insertTicket);

export default ticketRouter