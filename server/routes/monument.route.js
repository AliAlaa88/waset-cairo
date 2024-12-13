import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import monumentController from "../controllers/monument.controller.js";

const monumentRouter = Router();

monumentRouter.get("/", monumentController.getAllMonuments);
monumentRouter.get("/:id", monumentController.getMonument);
monumentRouter.post("/create", monumentController.createMonument);
monumentRouter.delete("/delete/:id", monumentController.deleteMonument);

export default monumentRouter;