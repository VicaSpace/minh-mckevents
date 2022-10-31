import createHttpError from 'http-errors';

import { prisma } from '@/db';

interface GetEventDetailPayload {
  eventId: number;
}

/**
 * Get Event's Detail, including
 * participations, votes
 * @param payload Payload
 */
export const getEventDetail = async (payload: GetEventDetailPayload) => {
  const { eventId } = payload;
  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    include: {
      participations: true,
      timeSlots: {
        include: {
          timeSlotVotes: true,
        },
      },
    },
  });

  // Check if event exist
  if (!event) {
    throw createHttpError(404, 'The event does not exist.');
  }

  return event;
};
