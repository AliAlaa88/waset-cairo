import { Router } from "express";
import tourController from "../controllers/tour.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const tourRouter = Router();

tourRouter.get("/", tourController.getAllTours);
tourRouter.get("/:id", tourController.getTour);

tourRouter.post("/", authMiddleware, tourController.createTour);
tourRouter.delete("/:id", authMiddleware, tourController.deleteTour);

export default tourRouter;