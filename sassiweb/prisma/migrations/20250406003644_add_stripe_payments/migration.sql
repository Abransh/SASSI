/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `TeamApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'UNPAID');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('EVENT_REGISTRATION', 'TEAM_APPLICATION');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "requiresPayment" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID';

-- AlterTable
ALTER TABLE "TeamApplication" ADD COLUMN     "paymentId" TEXT;

-- CreateTable
CREATE TABLE "StripePayment" (
    "id" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "stripePaymentId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentType" "PaymentType" NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT,
    "teamApplicationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StripePayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StripePayment_stripeSessionId_key" ON "StripePayment"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "StripePayment_teamApplicationId_key" ON "StripePayment"("teamApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamApplication_paymentId_key" ON "TeamApplication"("paymentId");

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "StripePayment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePayment" ADD CONSTRAINT "StripePayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePayment" ADD CONSTRAINT "StripePayment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePayment" ADD CONSTRAINT "StripePayment_teamApplicationId_fkey" FOREIGN KEY ("teamApplicationId") REFERENCES "TeamApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
