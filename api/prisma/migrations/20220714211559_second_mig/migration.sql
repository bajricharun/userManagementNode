/*
  Warnings:

  - You are about to drop the column `userId` on the `Permissions` table. All the data in the column will be lost.
  - Added the required column `permissionId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_userId_fkey";

-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
