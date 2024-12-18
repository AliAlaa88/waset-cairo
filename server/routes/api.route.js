import { Router } from 'express'

import authRouter from './auth.route.js'
import tourRouter from './tour.route.js';
import ticketRouter from './ticket.route.js';
import packRouter from './pack.route.js';
import eventRouter from './event.route.js';
import monumentRouter from './monument.route.js';
import groupRouter from './group.route.js';
import feedbackRouter from './feedback.route.js';
import reportRouter from './report.route.js';
import userRouter from './user.route.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const apiRouter = Router()

apiRouter.use('/auth', authRouter); // not all sub routes protected
apiRouter.use('/events', authMiddleware, eventRouter);
apiRouter.use('/feedback', authMiddleware, feedbackRouter);
apiRouter.use('/groups', authMiddleware, groupRouter);
apiRouter.use('/monuments', authMiddleware, monumentRouter);
apiRouter.use('/packs', authMiddleware, packRouter);
apiRouter.use('/report', authMiddleware, reportRouter);
apiRouter.use('/ticket', authMiddleware, ticketRouter);
apiRouter.use('/tours', authMiddleware, tourRouter);
apiRouter.use('/user', authMiddleware, userRouter);

export default apiRouter