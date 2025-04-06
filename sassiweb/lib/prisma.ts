import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  try {
    console.log("Initializing Prisma client...");
    
    const client = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
    
    // Test the connection
    client.$connect()
      .then(() => console.log("Prisma client connected successfully"))
      .catch(e => console.error("Prisma connection error:", e));
    
    return client;
  } catch (e) {
    console.error("Error creating Prisma client:", e);
    throw e;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;