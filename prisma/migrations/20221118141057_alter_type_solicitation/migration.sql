/*
  Warnings:

  - You are about to alter the column `value_solicitation` on the `solicitation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `solicitation` MODIFY `value_solicitation` INTEGER NOT NULL;
