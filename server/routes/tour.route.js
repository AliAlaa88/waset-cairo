import { Router } from "express";
import tourController from "../controllers/tour.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const tourRouter = Router();

tourRouter.get("/", tourController.getAllTours);
tourRouter.get("/didnt-start", authMiddleware, tourController.getToursThatDidntStart);
tourRouter.get("/:id", tourController.getTour);
tourRouter.get("/tourists/:tourid", authMiddleware, tourController.getTouristsGoingToTour);
tourRouter.get("/guide/:guideid", authMiddleware, tourController.getToursByGuide);
tourRouter.get("/tourist/:touristid", authMiddleware, tourController.getTouristTourHistory);

tourRouter.post("/", authMiddleware, tourController.createTour);
tourRouter.delete("/:id", authMiddleware, tourController.deleteTour);

export default tourRouter;