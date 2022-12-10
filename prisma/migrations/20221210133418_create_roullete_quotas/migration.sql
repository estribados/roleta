-- CreateTable
CREATE TABLE `Roulletes` (
    `id` VARCHAR(191) NOT NULL,
    `nameCategory` VARCHAR(191) NOT NULL,
    `price_roullete` INTEGER NOT NULL,
    `status` ENUM('ATIVA', 'INATIVA') NOT NULL DEFAULT 'ATIVA',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quotas` (
    `id` VARCHAR(191) NOT NULL,
    `roulleteId` VARCHAR(191) NOT NULL,
    `valueQuota` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `percentageQuota` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quotas` ADD CONSTRAINT `Quotas_roulleteId_fkey` FOREIGN KEY (`roulleteId`) REFERENCES `Roulletes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
