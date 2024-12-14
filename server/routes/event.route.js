import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import eventController from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/:id', eventController.getEvent);

eventRouter.post('/', authMiddleware, eventController.createEvent);
eventRouter.put('/:id', authMiddleware, eventController.updateEvent);
eventRouter.delete('/:id', authMiddleware, eventController.deleteEvent);

export default eventRouter;