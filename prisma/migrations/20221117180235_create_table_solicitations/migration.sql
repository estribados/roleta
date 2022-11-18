-- CreateTable
CREATE TABLE `Solicitation` (
    `id` VARCHAR(191) NOT NULL,
    `value_solicitation` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('PAGO', 'SOLICITADO') NOT NULL DEFAULT 'SOLICITADO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Solicitation` ADD CONSTRAINT `Solicitation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
