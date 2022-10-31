import { Request, Response } from 'express';

import { getUpcomingEvents } from '@/services/event/getUpcomingEvents';

/**
 * Handler for GetUpcomingEvents
 * @param req Request
 * @param res Response
 */
export const getUpcomingEventsHandler = (req: Request, res: Response) => {
  const events = getUpcomingEvents();
  res.status(200).json(events);
};
