import createHttpError from 'http-errors';

import { prisma } from '@/db';

interface ParticipateEventPayload {
  // eventId from path params
  eventId: number;
  userId: number;
  timeSlotIds: number[]; // List of chosen TimeSlot IDS
}

/**
 * Participate in an event
 * @param payload Payload
 * @returns Participation
 */
export const participateEvent = async (payload: ParticipateEventPayload) => {
  const { timeSlotIds, eventId, userId } = payload;

  // Check if there are votes before participating
  if (!timeSlotIds || timeSlotIds.length === 0) {
    createHttpError(
      400,
      'Vote for time slot must be made before registration.'
    );
  }

  // Check if user has already participated
  const participation = await prisma.eventParticipation.findFirst({
    where: {
      userId,
      eventId,
    },
  });
  if (participation) {
    throw createHttpError(400, 'User has already participated in the event.');
  }

  // Prepare payload for creating many votes
  const createIdsPayload = timeSlotIds.map((tId) => {
    return {
      userId,
      timeSlotId: tId,
    };
  });

  // Transaction to create participation & timeSlotVotes
  const userParticipation = await prisma.$transaction(async (prisma) => {
    // Participate in an event
    const participation = await prisma.eventParticipation.create({
      data: {
        userId,
        eventId,
      },
    });

    // Cast one or many votes to time slots
    await prisma.timeSlotVote.createMany({
      data: createIdsPayload,
    });
    return participation;
  });

  return userParticipation;
};
