import { Router } from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import userController from '../controllers/user.controller.js'
const userRouter = Router()

userRouter.get('/tourists', authMiddleware, userController.getAllTourists)
userRouter.get('/tourists/:touristID', authMiddleware, userController.getTourist)
userRouter.put('/tourists/promote/:id', authMiddleware, userController.promoteTourist);
userRouter.put('/tourists/ban/:id', authMiddleware, userController.banTourist);
userRouter.get('/tourists/fav', authMiddleware, userController.getTouristFavExperience);
userRouter.get('/tourists/insights/:touristid', authMiddleware, userController.getTouristInsights);
userRouter.get('/guides', authMiddleware, userController.getAllGuides)
userRouter.get('/guides/:guideID', authMiddleware, userController.getGuide)
userRouter.put('/guides/promote/:id', authMiddleware, userController.promoteGuide);
userRouter.get('/operators/packs/:opid', authMiddleware, userController.getOperatorPackages);
userRouter.get('/operators/events/:opid', authMiddleware, userController.getOperatorEvents);

export default userRouter