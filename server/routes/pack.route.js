import { Router } from "express";
import packController from "../controllers/pack.controller.js";

const packRouter = Router();

packRouter.get('/', packController.getAllPacks);
packRouter.get('/popular', packController.getMostPopularPack);
packRouter.get('/:id', packController.getPack);

packRouter.post('/', packController.createPack);
packRouter.put('/:id', packController.updatePack);
packRouter.delete('/:id', packController.deletePack);

export default packRouter;