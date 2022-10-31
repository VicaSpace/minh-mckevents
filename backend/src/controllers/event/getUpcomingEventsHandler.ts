import { Request, Response } from 'express';

import { getUpcomingEvents } from '@/services/event/getUpcomingEvents';

/**
 * Handler for GetUpcomingEvents
 * @param req Request
 * @param res Response
 */
export const getUpcomingEventsHandler = async (req: Request, res: Response) => {
  const events = await getUpcomingEvents();
  res.status(200).json(events);
};
