import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import packController from "../controllers/pack.controller.js";

const packRouter = Router();

packRouter.get('/', packController.getAllPacks);
packRouter.get('/:id', packController.getPack);

packRouter.post('/create', authMiddleware, packController.createPack);
packRouter.delete('/delete/:id', authMiddleware, packController.deletePack);

export default packRouter;