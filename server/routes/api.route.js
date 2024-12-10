import { Router } from 'express'

import authRouter from './auth.route'
import feedbackRouter from './feedback.route'
import reportRouter from './report.route'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/feedback', feedbackRouter)
apiRouter.use('/report', reportRouter)

export default apiRouter