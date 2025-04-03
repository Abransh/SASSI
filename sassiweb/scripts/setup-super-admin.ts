import prisma from "@/lib/prisma";

async function setupSuperAdmin() {
  try {
    // Update the admin@sassimilan.com user to be a super admin
    const superAdmin = await prisma.user.update({
      where: {
        email: "admin@sassimilan.com",
      },
      data: {
        isSuperAdmin: true,
        role: "ADMIN",
      },
    });

    console.log("Super admin setup successful:", superAdmin);
  } catch (error) {
    console.error("Error setting up super admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

setupSuperAdmin(); 