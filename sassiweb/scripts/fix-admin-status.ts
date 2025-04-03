import prisma from "@/lib/prisma";

async function fixAdminStatus() {
  try {
    // First, find the admin@sassimilan.com user
    const admin = await prisma.user.findUnique({
      where: {
        email: "admin@sassimilan.com",
      },
    });

    if (!admin) {
      console.error("Admin user not found!");
      return;
    }

    // Update to super admin
    const updatedAdmin = await prisma.user.update({
      where: {
        email: "admin@sassimilan.com",
      },
      data: {
        role: "ADMIN",
        isSuperAdmin: true,
      },
    });

    console.log("Admin status restored successfully:", updatedAdmin);
  } catch (error) {
    console.error("Error restoring admin status:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminStatus(); 