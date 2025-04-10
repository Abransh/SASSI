-- CreateTable
CREATE TABLE "ExclusiveMembership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExclusiveMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExclusiveMembership_userId_key" ON "ExclusiveMembership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ExclusiveMembership_code_key" ON "ExclusiveMembership"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ExclusiveMembership_paymentId_key" ON "ExclusiveMembership"("paymentId");

-- CreateIndex
CREATE INDEX "ExclusiveMembership_userId_idx" ON "ExclusiveMembership"("userId");

-- AddForeignKey
ALTER TABLE "ExclusiveMembership" ADD CONSTRAINT "ExclusiveMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
