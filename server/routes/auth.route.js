import { Router } from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const authRouter = Router()

authRouter.post('/signup', authController.signup)
authRouter.post('/login', authController.login)
// add resetPassword not protected route
authRouter.post('/newPassword', authMiddleware, authController.updatePassword)
authRouter.post('/logOut', authMiddleware, authController.logout)

export default authRouter