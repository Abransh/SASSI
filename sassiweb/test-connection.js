// test-connection.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Connection successful:', result)
  } catch (error) {
    console.error('Connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()