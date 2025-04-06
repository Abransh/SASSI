// scripts/ensure-admin.js
// Script to ensure an admin user exists in the database

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function ensureAdminExists() {
  try {
    console.log('Checking for admin user...');
    
    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@sassimilan.com' },
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return existingAdmin;
    }
    
    // Create admin if not exists
    console.log('Creating admin user...');
    const adminPassword = await bcrypt.hash('Admin@SASSI123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@sassimilan.com',
        name: 'SASSI Admin',
        password: adminPassword,
        role: 'ADMIN',
        isSuperAdmin: true,
      },
    });
    
    console.log('Admin user created successfully', admin.id);
    return admin;
  } catch (error) {
    console.error('Error ensuring admin exists:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
ensureAdminExists()
  .then(() => {
    console.log('Admin check completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error in admin check script:', error);
    process.exit(1);
  }); 