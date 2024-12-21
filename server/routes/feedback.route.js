import { Router } from 'express'
import feedbackController from '../controllers/feedback.controller.js'
const feedbackRouter = Router()

feedbackRouter.get('/', feedbackController.getAllFeedbacks)
feedbackRouter.get('/:feedbackID', feedbackController.getFeedback)
feedbackRouter.get('/tourist/:id', feedbackController.getTouristFeedback);
feedbackRouter.get('/tour/:id', feedbackController.getTourFeedback);
feedbackRouter.post('/', feedbackController.insertFeedback);
feedbackRouter.delete('/:id', feedbackController.deleteFeedback);

export default feedbackRouter