import { Router } from 'express'
import reportController from '../controllers/report.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
const reportRouter = Router()

reportRouter.get('/', authMiddleware, reportController.getAllReports)
reportRouter.get('/:reportID', authMiddleware, reportController.getReport)
reportRouter.post('/', authMiddleware, reportkController.insertReport)

export default reportRouter