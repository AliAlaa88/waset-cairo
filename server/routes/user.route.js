import { Router } from 'express'
import userController from '../controllers/user.controller.js'
const userRouter = Router()

userRouter.get('/tourists', userController.getAllTourists)
userRouter.get('/tourists/demographics', userController.getTouristsDemographics);
userRouter.get('/tourists/insights', userController.getTouristInsights);
userRouter.get('/tourists/fav', userController.getTouristFavExperience);
userRouter.get('/tourists/:touristID', userController.getTourist)
userRouter.put('/tourists/promote/:id', userController.promoteTourist);
userRouter.put('/tourists/ban/:id', userController.banTourist);
userRouter.put('/tourists/unban/:id', userController.unbanTourist);
userRouter.get('/guides/touristsInTours/:id', userController.getTouristsGoingToGuideTours);
userRouter.get('/guides/top-performing', userController.getTopPerformingGuides);
userRouter.get('/guides', userController.getAllGuides)
userRouter.get('/guides/:guideID', userController.getGuide)
userRouter.put('/guides/promote/:id', userController.promoteGuide);
userRouter.get('/operators/packs', userController.getOperatorPackages);
userRouter.get('/operators/events', userController.getOperatorEvents);
userRouter.get('/operators/dashboard', userController.getOperatorDashboard);
userRouter.get('/currUser', userController.getCurrUserData);

export default userRouter