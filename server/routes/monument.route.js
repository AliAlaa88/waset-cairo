import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import monumentController from "../controllers/monument.controller.js";

const monumentRouter = Router();

monumentRouter.get("/", monumentController.getAllMonuments);
monumentRouter.get("/:id", monumentController.getMonument);
monumentRouter.post("/", monumentController.createMonument);
monumentRouter.delete("/:id", authMiddleware, monumentController.deleteMonument);
monumentRouter.put("/:id", authMiddleware, monumentController.updateMonument);

export default monumentRouter;