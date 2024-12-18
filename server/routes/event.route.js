import { Router } from "express";
import eventController from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.get('/', eventController.getAllEvents);
eventRouter.get('/:id', eventController.getEvent);

eventRouter.post('/', eventController.createEvent);
eventRouter.put('/:id', eventController.updateEvent);
eventRouter.delete('/:id', eventController.deleteEvent);

export default eventRouter;