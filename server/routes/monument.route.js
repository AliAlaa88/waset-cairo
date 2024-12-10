import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import monumentController from "../controllers/monument.controller.js";

const monumentRouter = Router();

monumentRouter.get("/getAll", monumentController.getAllMonuments);
monumentRouter.get("/getMonument/:id", monumentController.getMonument);

export default monumentRouter;