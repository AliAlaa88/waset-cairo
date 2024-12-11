import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import groupController from "../controllers/group.controller.js";

const groupRouter = Router();

groupRouter.get('/', groupController.getAllGroups);
groupRouter.get('/:id', groupController.getGroup);

groupRouter.post('/create', groupController.createGroup);
groupRouter.delete('/delete/:id', groupController.deleteGroup);

groupRouter.post('/join/:id', groupController.joinGroup);
groupRouter.delete('/leave/:id', groupController.leaveGroup);

export default groupRouter;