-- AlterTable
ALTER TABLE `solicitation` MODIFY `status` ENUM('PAGO', 'SOLICITADO', 'RECUSADO') NOT NULL DEFAULT 'SOLICITADO';

-- CreateTable
CREATE TABLE `Notifications` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `solicitationId` VARCHAR(191) NOT NULL,
    `visualized` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_solicitationId_fkey` FOREIGN KEY (`solicitationId`) REFERENCES `Solicitation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
