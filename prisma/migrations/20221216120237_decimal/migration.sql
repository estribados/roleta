/*
  Warnings:

  - You are about to alter the column `price_roullete` on the `roulletes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE `roulletes` MODIFY `price_roullete` DECIMAL(9, 2) NOT NULL;

-- AlterTable
ALTER TABLE `solicitation` MODIFY `value_solicitation` DECIMAL(9, 2) NOT NULL;
