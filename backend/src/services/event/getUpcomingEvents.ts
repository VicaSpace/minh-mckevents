import { prisma } from '@/db';

/**
 * Get Upcoming Events from DB,
 * including participants
 * @returns Upcoming Events
 */
export const getUpcomingEvents = async () => {
  const events = await prisma.event.findMany({
    where: {
      NOT: {
        status: 'CANCELLED',
      },
    },
    include: {
      participations: true,
      timeSlots: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return events;
};
