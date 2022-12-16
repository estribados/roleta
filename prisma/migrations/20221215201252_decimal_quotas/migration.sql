/*
  Warnings:

  - You are about to alter the column `valueQuota` on the `quotas` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `quotas` MODIFY `valueQuota` DECIMAL(65, 30) NOT NULL;
