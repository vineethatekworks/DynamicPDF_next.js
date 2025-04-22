/*
  Warnings:

  - You are about to drop the column `forgotPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordTokenExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FormData" ADD COLUMN     "nominatedById" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "forgotPasswordToken",
DROP COLUMN "forgotPasswordTokenExpiry",
DROP COLUMN "isVerified",
DROP COLUMN "verifyToken",
DROP COLUMN "verifyTokenExpiry";

-- AddForeignKey
ALTER TABLE "FormData" ADD CONSTRAINT "FormData_nominatedById_fkey" FOREIGN KEY ("nominatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
