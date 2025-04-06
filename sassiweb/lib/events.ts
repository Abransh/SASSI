import prisma from "./prisma";

/**
 * Cleans up expired registration records.
 * This function marks expired pending registrations as cancelled.
 */
export async function cleanupExpiredRegistrations() {
  try {
    const now = new Date();
    console.log(`Cleaning up expired registrations at ${now.toISOString()}`);
    
    // Find all expired pending registrations
    const expiredRegistrations = await prisma.registration.findMany({
      where: {
        status: 'PENDING',
        expiresAt: {
          lt: now
        }
      }
    });
    
    console.log(`Found ${expiredRegistrations.length} expired registrations`);
    
    if (expiredRegistrations.length > 0) {
      // Update all expired registrations to cancelled
      const result = await prisma.registration.updateMany({
        where: {
          status: 'PENDING',
          expiresAt: {
            lt: now
          }
        },
        data: {
          status: 'CANCELLED',
        }
      });
      
      console.log(`Updated ${result.count} expired registrations to CANCELLED`);
    }
    
    return { cleaned: expiredRegistrations.length };
  } catch (error) {
    console.error('Error cleaning up expired registrations:', error);
    throw error;
  }
} 