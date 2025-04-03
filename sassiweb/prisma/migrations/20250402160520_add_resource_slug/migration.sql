/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Resource_slug_key" ON "Resource"("slug");
