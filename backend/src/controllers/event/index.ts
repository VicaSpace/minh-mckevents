import { createEventHandler } from '@/controllers/event/createEventHandler';
import { getUpcomingEventsHandler } from '@/controllers/event/getUpcomingEventsHandler';

export const eventController = {
  getUpcomingEventsHandler,
  createEventHandler,
};
