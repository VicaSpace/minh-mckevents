import { Request, Response } from 'express';

import { getEventDetail } from '@/services/event/getEventDetail';

/**
 * Handler for GetEventDetail
 * @param req Request
 * @param res Response
 */
export const getEventDetailHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await getEventDetail({
    eventId: Number(id),
  });
  res.status(200).json(event);
};
