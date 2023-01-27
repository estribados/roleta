/*
  Warnings:

  - You are about to alter the column `credits` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Decimal(9,3)`.
  - You are about to alter the column `house_profit` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Decimal(9,3)`.
  - You are about to alter the column `profit` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Decimal(9,3)`.
  - You are about to alter the column `bonus` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Decimal(9,3)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `credits` DECIMAL(9, 3) NULL DEFAULT 0,
    MODIFY `house_profit` DECIMAL(9, 3) NULL DEFAULT 0,
    MODIFY `profit` DECIMAL(9, 3) NULL DEFAULT 0,
    MODIFY `bonus` DECIMAL(9, 3) NULL DEFAULT 0;
