import { Router } from 'express';
import ticketController from '../controllers/ticket.controller.js';
const ticketRouter = Router();

ticketRouter.get('/', ticketController.getUserTickets);
ticketRouter.post('/:id', ticketController.insertTicket);
ticketRouter.put('/:id', ticketController.updateTicket);
ticketRouter.delete('/:id', ticketController.deleteTicket);

export default ticketRouter