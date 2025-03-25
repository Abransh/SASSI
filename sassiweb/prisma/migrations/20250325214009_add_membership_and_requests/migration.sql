-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membershipExpiryDate" TIMESTAMP(3),
ADD COLUMN     "paymentVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "MembershipRequest" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isStudent" BOOLEAN NOT NULL DEFAULT true,
    "university" TEXT NOT NULL,
    "codiceFiscale" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "paymentReference" TEXT,
    "notes" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "MembershipRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamApplication" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "motivation" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "TeamApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MembershipRequest" ADD CONSTRAINT "MembershipRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamApplication" ADD CONSTRAINT "TeamApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
