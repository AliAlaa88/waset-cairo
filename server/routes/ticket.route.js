import { Router } from 'express';
import ticketController from '../controllers/ticket.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'; 
const ticketRouter = Router();

ticketRouter.get('/', authMiddleware, ticketController.getUserTickets);
ticketRouter.post('/:id', authMiddleware, ticketController.insertTicket);
ticketRouter.put('/:id', authMiddleware, ticketController.updateTicket);
ticketRouter.delete('/:id', authMiddleware, ticketController.deleteTicket);

export default ticketRouter