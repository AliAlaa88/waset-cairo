import { Router } from "express";
import groupController from "../controllers/group.controller.js";

const groupRouter = Router();

groupRouter.get('/', groupController.getAllGroups);
groupRouter.get('/:id', groupController.getGroup);
groupRouter.get('/members/:id', groupController.getGroupMembers);
groupRouter.get('/tourist/:id', groupController.getTouristGroups);

groupRouter.post('/', groupController.createGroup);
groupRouter.delete('/:id', groupController.deleteGroup);

groupRouter.post('/join/:id', groupController.joinGroup);
groupRouter.delete('/leave/:id', groupController.leaveGroup);

export default groupRouter;