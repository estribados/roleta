/*
  Warnings:

  - You are about to alter the column `valueQuota` on the `quotas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE `quotas` MODIFY `valueQuota` DECIMAL(9, 2) NOT NULL;
