/*
  Warnings:

  - You are about to alter the column `value_solicitation` on the `solicitation` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `solicitation` MODIFY `value_solicitation` DECIMAL(65, 30) NOT NULL;
