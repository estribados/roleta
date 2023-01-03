-- AlterTable
ALTER TABLE `roulletes` MODIFY `status` ENUM('ATIVA', 'INATIVA') NOT NULL DEFAULT 'INATIVA';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `house_profit` DECIMAL(9, 2) NULL DEFAULT 0;
