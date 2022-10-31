import { createEventHandler } from '@/controllers/event/CreateEventHandler';
import { getUpcomingEventsHandler } from '@/controllers/event/getUpcomingEventsHandler';

export const eventController = {
  getUpcomingEventsHandler,
  createEventHandler,
};
