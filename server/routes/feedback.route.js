import { Router } from 'express'
import feedbackController from '../controllers/feedback.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const feedbackRouter = Router()

feedbackRouter.get('/', authMiddleware, feedbackController.getAllFeedbacks)
feedbackRouter.get('/:feedbackID', authMiddleware, feedbackController.getFeedback)
feedbackRouter.post('/:id', authMiddleware, feedbackController.insertFeedback)

export default feedbackRouter