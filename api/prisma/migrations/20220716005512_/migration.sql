/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Permissions_code_key" ON "Permissions"("code");
