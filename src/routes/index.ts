import { Router } from 'express';
import UserRouter from './Users';
import SeriesRouter from './Series';
import ChannelsRouter from './Channels';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/series', SeriesRouter);
router.use('/channels', ChannelsRouter);

// Export the base-router
export default router;
