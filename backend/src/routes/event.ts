import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { eventController } from '@/controllers/event';

const router = Router();

router.get('/upcoming', asyncHandler(eventController.getUpcomingEventsHandler));
router.post('/', asyncHandler(eventController.createEventHandler));

export { router as eventRouter };
