import { Router } from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const authRouter = Router()

authRouter.post('/tourist/signup', authController.touristSignup)
authRouter.post('/tourist/login', authController.touristLogin)
authRouter.post('/tourist/logOut', authMiddleware, authController.logout)
// add resetPassword not protected route

authRouter.post('/guide/signup', authController.guideSignup)
authRouter.post('/guide/login', authController.guideLogin)
authRouter.post('/guide/logOut', authMiddleware, authController.logout)
// add resetPassword not protected route

authRouter.post('/operator/signup', authController.operatorSignup)
authRouter.post('/operator/login', authController.operatorLogin)
authRouter.post('/operator/logOut', authMiddleware, authController.logout)
// add resetPassword not protected route

export default authRouter