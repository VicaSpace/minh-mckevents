import { EventStatus, TimeSlotStatus } from '@prisma/client';

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
  // Create Event
  const event = await prisma.event.create({
    data: {
      ...payload,
      status: EventStatus.PENDING,
    },
  });

  // Create initial time slot for that
  await prisma.timeSlot.create({
    data: {
      eventId: event.id,
      time: new Date(payload.timeStart),
      status: TimeSlotStatus.ACTIVE, // Still active for voting
    },
  });
  return event;
};
