// scripts/update-admin-password.js
// Script to update an admin user's password securely

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function updateAdminPassword() {
  try {
    // Get email from command line args or use default
    const email = process.argv[2] || 'admin@sassimilan.com';
    
    // Get password from .env or command line args
    const newPassword = process.argv[3] || process.env.ADMIN_PASSWORD || 'Admin@SASSI123';
    
    if (!newPassword) {
      console.error('No password provided. Set ADMIN_PASSWORD in .env file or provide as argument.');
      process.exit(1);
    }
    
    console.log(`Updating password for user: ${email}`);
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      console.error(`User with email ${email} not found`);
      return;
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the admin user's password
    const updatedAdmin = await prisma.user.update({
      where: {
        email
      },
      data: {
        password: hashedPassword
      }
    });
    
    console.log(`Admin password updated successfully for: ${updatedAdmin.email}`);
    
    // Don't log the actual password
    console.log('Password has been updated.');
  } catch (error) {
    console.error("Error updating admin password:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
updateAdminPassword()
  .then(() => {
    console.log('Password update completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error in password update script:', error);
    process.exit(1);
  }); 