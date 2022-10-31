import { EventStatus } from '@prisma/client';

import { prisma } from '@/db';

export interface CreateEventPayload {
  name: string;
  organizerId: number;
  description: string;
  date: Date;
  office: string;
  duration?: number;
  timeStart: Date;
  location: string;
  minParticipants: number;
}

/**
 * Created an Event
 * @param payload Payload to Create Event
 * @returns Created Event
 */
export const createEvent = async (payload: CreateEventPayload) => {
  const event = await prisma.event.create({
    data: {
      ...payload,
      status: EventStatus.PENDING,
    },
  });
  return event;
};
