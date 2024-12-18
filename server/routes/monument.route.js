import { Router } from "express";
import monumentController from "../controllers/monument.controller.js";

const monumentRouter = Router();

monumentRouter.get("/", monumentController.getAllMonuments);
monumentRouter.get("/:id", monumentController.getMonument);
monumentRouter.post("/", monumentController.createMonument);
monumentRouter.delete("/:id", monumentController.deleteMonument);
monumentRouter.put("/:id", monumentController.updateMonument);

export default monumentRouter;