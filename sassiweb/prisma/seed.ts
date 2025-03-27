// prisma/seed.ts - Updated to include resource categories

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
  
  // Create resource categories
  const categoryBeforeArrival = await prisma.resourceCategory.upsert({
    where: { slug: 'before-arrival' },
    update: {},
    create: {
      name: 'Before Arrival',
      slug: 'before-arrival',
      description: 'Everything you need to know before coming to Milan - visas, accommodation, and preparation tips.',
      order: 1,
    },
  });
  
  const categoryLivingInMilan = await prisma.resourceCategory.upsert({
    where: { slug: 'living-in-milan' },
    update: {},
    create: {
      name: 'Living in Milan',
      slug: 'living-in-milan',
      description: 'Resources to help you settle in and navigate daily life in Milan - from transportation to healthcare.',
      order: 2,
    },
  });
  
  const categoryAfterGraduation = await prisma.resourceCategory.upsert({
    where: { slug: 'after-graduation' },
    update: {},
    create: {
      name: 'After Graduation',
      slug: 'after-graduation',
      description: 'Resources for your next steps after completing your studies - career opportunities, staying in Italy, and more.',
      order: 3,
    },
  });
  
  console.log({ 
    categoryBeforeArrival, 
    categoryLivingInMilan, 
    categoryAfterGraduation 
  });
  
  // Create sample resources
  const resource1 = await prisma.resource.upsert({
    where: { id: 'resource1' },
    update: {},
    create: {
      title: 'Complete Guide to Student Visas',
      description: 'Step-by-step instructions for obtaining your Italian student visa, including required documents and application tips.',
      fileUrl: 'https://example.com/resources/visa-guide.pdf',
      resourceType: 'GUIDE',
      featured: true,
      categoryId: categoryBeforeArrival.id,
    },
  });
  
  const resource2 = await prisma.resource.upsert({
    where: { id: 'resource2' },
    update: {},
    create: {
      title: 'Milan Transportation Guide',
      description: 'Guide to navigating Milan\'s public transportation system, including metro, trams, buses, and student discounts.',
      fileUrl: 'https://example.com/resources/transportation-guide.pdf',
      resourceType: 'GUIDE',
      featured: true,
      categoryId: categoryLivingInMilan.id,
    },
  });
  
  const resource3 = await prisma.resource.upsert({
    where: { id: 'resource3' },
    update: {},
    create: {
      title: 'CV Template for Italian Job Market',
      description: 'Customized CV template for international students looking for jobs in Italy, with tips on adapting your resume.',
      fileUrl: 'https://example.com/resources/cv-template.docx',
      resourceType: 'TEMPLATE',
      featured: true,
      categoryId: categoryAfterGraduation.id,
    },
  });
  
  console.log({ resource1, resource2, resource3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });