import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import groupController from "../controllers/group.controller.js";

const groupRouter = Router();

groupRouter.get('/', groupController.getAllGroups);
groupRouter.get('/:id', groupController.getGroup);
groupRouter.get('/members/:id', authMiddleware, groupController.getGroupMembers);
groupRouter.get('/tourist/:id', authMiddleware, groupController.getTouristGroups);

groupRouter.post('/', authMiddleware, groupController.createGroup);
groupRouter.delete('/:id', authMiddleware, groupController.deleteGroup);

groupRouter.post('/join/:id', authMiddleware, groupController.joinGroup);
groupRouter.delete('/leave/:id', authMiddleware, groupController.leaveGroup);

export default groupRouter;