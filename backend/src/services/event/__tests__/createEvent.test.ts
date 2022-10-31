/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/db';
import { createEvent } from '@/services/event/createEvent';

describe('test event/createEvent service', () => {
  it('should return a created event after creating', async () => {
    const expectedRes = {
      id: 2,
      name: 'Weekend Soccer Match',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: '2022-11-02T00:00:00.000Z',
      duration: 2,
      timeStart: '2022-11-02T19:30:00.000Z',
      location: 'Binh Quoi Soccer Field',
      minParticipants: 10,
      office: 'Ho Chi Minh Office',
      organizerId: 1,
      status: 'PENDING',
      createdAt: '2022-10-31T08:58:51.752Z',
      updatedAt: '2022-10-31T08:58:51.752Z',
    };

    /* Mock methods */
    jest.spyOn(prisma.event, 'create').mockResolvedValue(expectedRes as any);
    jest
      .spyOn(prisma.eventParticipation, 'create')
      .mockResolvedValue(null as any);
    jest.spyOn(prisma.timeSlot, 'create').mockResolvedValue({
      eventId: 2,
    } as any);
    jest.spyOn(prisma.timeSlotVote, 'create').mockResolvedValue({
      userId: 1,
      timeSlotId: 1,
    } as any);

    const res = await createEvent({
      name: 'Weekend Soccer Match',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: new Date('2022-11-02T00:00:00.000Z'),
      duration: 2,
      timeStart: new Date('2022-11-02T19:30:00.000Z'),
      location: 'Binh Quoi Soccer Field',
      minParticipants: 10,
      office: 'Ho Chi Minh Office',
      organizerId: 1,
    });
    expect(res).toMatchObject(expectedRes);
  });

  it('should throw errors when encounter one', async () => {
    jest.spyOn(prisma.event, 'create').mockRejectedValue(new Error());
    expect(
      createEvent({
        name: 'Weekend Soccer Match',
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: new Date('2022-11-02T00:00:00.000Z'),
        duration: 2,
        timeStart: new Date('2022-11-02T19:30:00.000Z'),
        location: 'Binh Quoi Soccer Field',
        minParticipants: 10,
        office: 'Ho Chi Minh Office',
        organizerId: 1,
      })
    ).rejects.toThrow();
  });
});
