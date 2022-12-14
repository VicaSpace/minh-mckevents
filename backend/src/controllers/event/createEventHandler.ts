import { Request, Response } from 'express';

import { createEvent } from '@/services/event/createEvent';

/**
 * Handler for CreateEvent
 * @param req Request
 * @param res Response
 */
export const createEventHandler = async (req: Request, res: Response) => {
  const { body, user } = req;
  const createdEvent = await createEvent({
    name: body.name,
    description: body.description,
    organizerId: user.id,
    location: body.location,
    date: new Date(body.date),
    timeStart: new Date(body.timeStart),
    minParticipants: body.minParticipants,
    office: body.office,
    duration: body.duration,
  });
  res.status(200).json(createdEvent);
};
