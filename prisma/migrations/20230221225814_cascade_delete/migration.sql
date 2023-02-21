-- DropForeignKey
ALTER TABLE `quotas` DROP FOREIGN KEY `Quotas_roulleteId_fkey`;

-- AddForeignKey
ALTER TABLE `Quotas` ADD CONSTRAINT `Quotas_roulleteId_fkey` FOREIGN KEY (`roulleteId`) REFERENCES `Roulletes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
