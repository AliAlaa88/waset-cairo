import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import eventController from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/:id', eventController.getEvent);

eventRouter.post('/', eventController.createEvent);
eventRouter.delete('/:id', eventController.deleteEvent);

export default eventRouter;