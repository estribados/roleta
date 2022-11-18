/*
  Warnings:

  - You are about to alter the column `credits` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `credits` DOUBLE NULL DEFAULT 0;
