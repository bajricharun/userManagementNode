/*
  Warnings:

  - You are about to drop the `UserPermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPermissions" DROP CONSTRAINT "UserPermissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "UserPermissions" DROP CONSTRAINT "UserPermissions_userId_fkey";

-- DropTable
DROP TABLE "UserPermissions";

-- CreateTable
CREATE TABLE "_PermissionsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionsToUser_AB_unique" ON "_PermissionsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionsToUser_B_index" ON "_PermissionsToUser"("B");

-- AddForeignKey
ALTER TABLE "_PermissionsToUser" ADD CONSTRAINT "_PermissionsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionsToUser" ADD CONSTRAINT "_PermissionsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
