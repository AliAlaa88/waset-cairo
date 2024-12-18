import { Router } from 'express'
import userController from '../controllers/user.controller.js'
const userRouter = Router()

userRouter.get('/tourists', userController.getAllTourists)
userRouter.get('/tourists/:touristID', userController.getTourist)
userRouter.put('/tourists/promote/:id', userController.promoteTourist);
userRouter.put('/tourists/ban/:id', userController.banTourist);
userRouter.get('/tourists/fav', userController.getTouristFavExperience);
userRouter.get('/tourists/insights/:touristid', userController.getTouristInsights);
userRouter.get('/guides/touristsInTours/:id', userController.getTouristsGoingToGuideTours);
userRouter.get('/guides', userController.getAllGuides)
userRouter.get('/guides/:guideID', userController.getGuide)
userRouter.put('/guides/promote/:id', userController.promoteGuide);
userRouter.get('/operators/packs/:opid', userController.getOperatorPackages);
userRouter.get('/operators/events/:opid', userController.getOperatorEvents);

export default userRouter