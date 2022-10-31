import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const seedEvents = async () => {
  // Create initial time slot for that
  const event = await prisma.event.create({
    data: {
      organizerId: 1,
      name: 'Badminton',
      date: new Date('2022-11-01'),
      location: 'Thanh Nhan Badminton Court, 49 Chua Boc, District Dong Da',
      minParticipants: 4,
      office: 'Ho Chi Minh Office',
      status: 'PENDING',
      description: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus diam quam, aliquet et felis et, sagittis pulvinar quam. Vestibulum feugiat urna vel elit convallis, quis consequat orci laoreet. Ut lacinia purus nec convallis laoreet. Nullam eu velit eros. Aliquam lectus felis, ullamcorper quis ultricies et, convallis eu enim. Proin pretium mattis commodo. Ut diam lectus, porta nec fringilla sed, euismod in neque. Phasellus dapibus quam eget malesuada volutpat. Ut aliquet viverra tortor, in egestas turpis dapibus eu. Pellentesque mollis, odio ut semper porttitor, tellus arcu tempor erat, a pharetra nisi nisl ut risus.

Etiam lacinia nunc a eros eleifend ornare. Aenean scelerisque congue tortor. Nam suscipit aliquam pellentesque. Fusce sit amet volutpat nulla, vel vestibulum sapien. Donec ut nulla convallis diam condimentum laoreet non at nibh. Curabitur vulputate faucibus quam eu volutpat. Phasellus aliquet euismod nulla, eu malesuada leo mollis at. Donec varius cursus augue, vel iaculis nibh auctor id. Cras porttitor, ante egestas posuere viverra, ligula metus dignissim odio, ut ultrices risus ex eget lorem.



Location: Thanh Nhan Badminton Court, 49 Chua Boc, District Dong Da, Ha Noi

Minimum: 10 people                        
      `,
    },
  });

  // Initial first participants
  await prisma.eventParticipation.create({
    data: {
      userId: 1,
      eventId: event.id,
    },
  });

  // Initialize time slot
  const initialSlot = await prisma.timeSlot.create({
    data: {
      eventId: event.id,
      time: new Date(2022, 11, 1, 19, 30), // 12:30 in GMT+0
      status: 'ACTIVE',
    },
  });

  // Cast a vote from the organizer
  await prisma.timeSlotVote.create({
    data: {
      userId: 1,
      timeSlotId: initialSlot.id,
    },
  });
};

async function main() {
  await seedEvents();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
