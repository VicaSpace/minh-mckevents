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
  const {
    date,
    description,
    location,
    minParticipants,
    name,
    office,
    timeStart,
    duration,
    organizerId,
  } = payload;
  // Create Event
  const event = await prisma.event.create({
    data: {
      name,
      organizerId,
      description,
      date,
      office,
      duration,
      location,
      minParticipants,
      status: EventStatus.PENDING,
    },
  });

  // Initial first participant for that event
  await prisma.eventParticipation.create({
    data: {
      userId: organizerId,
      eventId: event.id,
    },
  });

  // Create initial time slot for that
  const initialSlot = await prisma.timeSlot.create({
    data: {
      eventId: event.id,
      time: new Date(timeStart),
      status: TimeSlotStatus.ACTIVE, // Still active for voting
    },
  });

  // Cast a vote from the organizer for the initial slot
  await prisma.timeSlotVote.create({
    data: {
      userId: organizerId,
      timeSlotId: initialSlot.id,
    },
  });
  return event;
};
