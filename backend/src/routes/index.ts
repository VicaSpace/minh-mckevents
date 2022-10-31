import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { eventRouter } from '@/routes/event';
import { logger } from '@/utils/logger';

const router = Router();

router.use('/events', asyncHandler(eventRouter));
logger.info(`Mounted /events router ✅`);

export default router;
