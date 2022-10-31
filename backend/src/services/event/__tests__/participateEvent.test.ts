/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/db';
import { participateEvent } from '@/services/event/participateEvent';

describe('test event/participateEvent service', () => {
  it('should throw when user has already participated in the event', async () => {
    // An object has been return
    jest.spyOn(prisma.eventParticipation, 'findFirst').mockResolvedValue({
      eventId: 1,
      userId: 1,
    } as any);

    // Assertion
    expect(
      participateEvent({
        eventId: 1,
        timeSlotIds: [1],
        userId: 1,
      })
    ).rejects.toThrow();

    expect(
      participateEvent({
        eventId: 1,
        timeSlotIds: [1],
        userId: 1,
      })
    ).rejects.toMatchObject({
      message: 'User has already participated in the event.',
    });
  });
});
