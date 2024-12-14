import { Router } from 'express'
import reportController from '../controllers/report.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const reportRouter = Router()

reportRouter.get('/', authMiddleware, reportController.getAllReports)
reportRouter.get('/:reportID', authMiddleware, reportController.getReport)
reportRouter.get('/guide/:id', authMiddleware, reportController.getGuideReports);
reportRouter.get('/tour/:id', authMiddleware, reportController.getTourReports);
reportRouter.post('/:id', authMiddleware, reportController.insertReport);
reportRouter.delete('/:id', authMiddleware, reportController.deleteReport);

export default reportRouter