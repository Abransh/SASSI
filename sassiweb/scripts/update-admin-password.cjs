// scripts/update-admin-password.cjs
// Script to update an admin user's password securely
// IMPORTANT: This script should NOT be committed to version control

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const readline = require('readline');

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

// Create readline interface for secure password input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Securely prompt for password
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function updateAdminPassword() {
  try {
    // Get email from command line args or prompt for it
    let email = process.argv[2];
    if (!email) {
      email = await question('Enter admin email (default: admin@sassimilan.com): ');
      email = email || 'admin@sassimilan.com';
    }
    
    // Get password from .env or prompt for it (never use a default)
    let newPassword = process.env.ADMIN_PASSWORD;
    if (!newPassword) {
      newPassword = await question('Enter new password: ');
      if (!newPassword) {
        console.error('Password cannot be empty');
        process.exit(1);
      }
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
  } catch (error) {
    console.error("Error updating admin password:", error);
  } finally {
    rl.close();
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