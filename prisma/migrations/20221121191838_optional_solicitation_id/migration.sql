-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `Notifications_solicitationId_fkey`;

-- AlterTable
ALTER TABLE `notifications` MODIFY `solicitationId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_solicitationId_fkey` FOREIGN KEY (`solicitationId`) REFERENCES `Solicitation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
