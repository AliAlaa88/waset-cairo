import { Router } from 'express'
import feedbackController from '../controllers/feedback.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const feedbackRouter = Router()

feedbackRouter.get('/', authMiddleware, feedbackController.getAllFeedbacks)
feedbackRouter.get('/:feedbackID', authMiddleware, feedbackController.getFeedback)
feedbackRouter.get('/tourist/:id', authMiddleware, feedbackController.getTouristFeedback);
feedbackRouter.get('/tour/:id', authMiddleware, feedbackController.getTourFeedback);
feedbackRouter.post('/:id', authMiddleware, feedbackController.insertFeedback);
feedbackRouter.delete('/:id', authMiddleware, feedbackController.deleteFeedback);

export default feedbackRouter