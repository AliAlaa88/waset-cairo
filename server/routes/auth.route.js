import { Router } from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const authRouter = Router()

authRouter.post('/tourist/signup', authController.touristSignup)
authRouter.post('/tourist/login', authController.touristLogin)
authRouter.put('/tourist/edit', authMiddleware, authController.touristEditProfile);
authRouter.post('/tourist/logOut', authMiddleware, authController.logout)

authRouter.post('/guide/signup', authController.guideSignup)
authRouter.post('/guide/login', authController.guideLogin)
authRouter.put('/guide/edit', authMiddleware, authController.guideEditProfile);
authRouter.post('/guide/logOut', authMiddleware, authController.logout)

authRouter.post('/operator/signup', authController.operatorSignup)
authRouter.post('/operator/login', authController.operatorLogin)
authRouter.put('/operator/edit', authMiddleware, authController.operatorEditProfile);
authRouter.post('/operator/logOut', authMiddleware, authController.logout)

authRouter.put('/change-password', authMiddleware, authController.updatePassword);

export default authRouter