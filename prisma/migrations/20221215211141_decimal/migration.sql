/*
  Warnings:

  - You are about to alter the column `percentageQuota` on the `quotas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE `quotas` MODIFY `percentageQuota` DECIMAL(9, 2) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `credits` DECIMAL(9, 2) NULL DEFAULT 0;
