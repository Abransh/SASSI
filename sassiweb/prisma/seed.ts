import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('Admin@SASSI123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sassimilan.com' },
    update: {},
    create: {
      email: 'admin@sassimilan.com',
      name: 'SASSI Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log({ admin });

  // Create sample events
  const sampleEvent1 = await prisma.event.upsert({
    where: { id: 'clxxxxxxxxxx1' }, // This is a placeholder ID, will be replaced on create
    update: {},
    create: {
      title: 'Diwali Celebration 2025',
      description: 'Join us for a grand celebration of Diwali, the festival of lights. Enjoy traditional Indian food, music, and performances.',
      content: 'Full event details will be announced closer to the date.',
      location: 'Politecnico di Milano, Aula Magna',
      startDate: new Date('2025-11-01T18:00:00Z'),
      endDate: new Date('2025-11-01T22:00:00Z'),
      imageUrl: '/assests/groupimg.jpg', // Replace with actual image
      maxAttendees: 200,
      published: true,
      createdBy: admin.id,
    },
  });

  const sampleEvent2 = await prisma.event.upsert({
    where: { id: 'clxxxxxxxxxx2' }, // This is a placeholder ID, will be replaced on create
    update: {},
    create: {
      title: 'Freshers Welcome Party',
      description: 'Special welcome event for new Indian students in Milan. Meet seniors, make connections, and learn about life in Milan.',
      location: 'Student Center, Via Example 123',
      startDate: new Date('2025-09-15T17:00:00Z'),
      endDate: new Date('2025-09-15T20:00:00Z'),
      maxAttendees: 100,
      published: true,
      createdBy: admin.id,
    },
  });

  console.log({ sampleEvent1, sampleEvent2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });