import { Request, Response } from 'express';

import { participateEvent } from '@/services/event/participateEvent';

/**
 * Handler for ParticipateEvent
 * @param req Request
 * @param res Response
 */
export const participateEventHandler = async (req: Request, res: Response) => {
  const { body, user, params } = req;
  const participation = await participateEvent({
    eventId: Number(params.id),
    timeSlotIds: body.timeSlotIds,
    userId: user.id,
  });
  res.status(200).json(participation);
};
