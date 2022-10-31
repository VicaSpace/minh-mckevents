import { createEventHandler } from '@/controllers/event/createEventHandler';
import { getUpcomingEventsHandler } from '@/controllers/event/getUpcomingEventsHandler';
import { participateEventHandler } from '@/controllers/event/participateEventHandler';

export const eventController = {
  getUpcomingEventsHandler,
  createEventHandler,
  participateEventHandler,
};
