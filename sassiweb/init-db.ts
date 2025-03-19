// init-db.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create test user with profile
  const password = await hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: password,
      isProfilePublic: true,
      profile: {
        create: {}
      }
    },
  });
  
  console.log('Sample data created!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());