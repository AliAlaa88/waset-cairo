import { Router } from "express";
import tourController from "../controllers/tour.controller.js";

const tourRouter = Router();

tourRouter.get("/", tourController.getAllTours);
tourRouter.get("/didnt-start", tourController.getToursThatDidntStart);
tourRouter.get("/:id", tourController.getTour);
tourRouter.get("/tourists/:tourid", tourController.getTouristsGoingToTour);
tourRouter.get("/guide/:guideid", tourController.getToursByGuide);
tourRouter.get("/tourist/:touristid", tourController.getTouristTourHistory);

tourRouter.post("/", tourController.createTour);
tourRouter.put("/:id", tourController.updateTour);
tourRouter.delete("/:id", tourController.deleteTour);

export default tourRouter;