import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import userController from '../controllers/user.controller.js'
const userRouter = Router()

userRouter.get('/tourists', authMiddleware, userController.getAllTourists)
userRouter.get('/guides', authMiddleware, userController.getAllGuides)

export default userRouter