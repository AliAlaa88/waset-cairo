import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import userController from '../controllers/user.controller.js'
const userRouter = Router()

userRouter.get('/tourists', authMiddleware, userController.getAllTourists)
userRouter.get('/tourists/:touristID', authMiddleware, userController.getTourist)
userRouter.get('/guides', authMiddleware, userController.getAllGuides)
userRouter.get('/guides/:guideID', authMiddleware, userController.getGuide)

export default userRouter