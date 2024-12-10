import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import packController from "../controllers/pack.controller.js";

const packRouter = Router();

packRouter.get('/getAll', packController.getAllPacks);
packRouter.get('/getPack/:id', packController.getPack);

packRouter.post('/create', packController.createPack);
packRouter.delete('/delete/:id', packController.deletePack);

export default packRouter;