import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import eventController from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.get('/getAll', eventController.getAllEvents);
eventRouter.get('/getEvent/:id', eventController.getEvent);

eventRouter.post('/create', eventController.createEvent);
eventRouter.delete('/delete/:id', eventController.deleteEvent);

export default eventRouter;