import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  //
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .catch(async (_err) => {
    await prisma.$disconnect();
    process.exit(1);
  });
