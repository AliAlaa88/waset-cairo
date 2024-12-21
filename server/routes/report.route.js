import { Router } from 'express'
import reportController from '../controllers/report.controller.js'
const reportRouter = Router()

reportRouter.get('/', reportController.getAllReports)
reportRouter.get('/:reportID', reportController.getReport)
reportRouter.get('/guide/:id', reportController.getGuideReports);
reportRouter.get('/tour/:id', reportController.getTourReports);
reportRouter.post('/', reportController.insertReport);
reportRouter.delete('/:id', reportController.deleteReport);

export default reportRouter