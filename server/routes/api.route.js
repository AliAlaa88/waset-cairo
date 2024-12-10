import { Router } from 'express'

import authRouter from './auth.route.js'
import tourRouter from './tour.route.js';
import packRouter from './pack.route.js';
import eventRouter from './event.route.js';
import monumentRouter from './monument.route.js';
import groupRouter from './group.route.js';
import feedbackRouter from './feedback.route.js';
import reportRouter from './report.route.js';


const apiRouter = Router()

apiRouter.use('/auth', authRouter);
apiRouter.use('/tours', tourRouter);
apiRouter.use('/packs', packRouter);
apiRouter.use('/events', eventRouter);
apiRouter.use('/monuments', monumentRouter);
apiRouter.use('/groups', groupRouter);
apiRouter.use('/feedback', feedbackRouter)
apiRouter.use('/report', reportRouter)

export default apiRouter