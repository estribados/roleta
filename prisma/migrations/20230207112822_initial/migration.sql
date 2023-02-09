-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `bank` VARCHAR(191) NULL,
    `pix` VARCHAR(191) NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `credits` DECIMAL(9, 3) NULL DEFAULT 0,
    `profit` DECIMAL(9, 3) NULL DEFAULT 0,
    `bonus` DECIMAL(9, 3) NULL DEFAULT 0,
    `accumulated` DECIMAL(9, 3) NULL DEFAULT 0,
    `house_profit` DECIMAL(9, 3) NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitation` (
    `id` VARCHAR(191) NOT NULL,
    `value_solicitation` DECIMAL(9, 2) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('PAGO', 'SOLICITADO', 'RECUSADO') NOT NULL DEFAULT 'SOLICITADO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Solicitation_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `solicitationId` VARCHAR(191) NULL,
    `visualized` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Notifications_userId_idx`(`userId`),
    INDEX `Notifications_solicitationId_idx`(`solicitationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roulletes` (
    `id` VARCHAR(191) NOT NULL,
    `nameCategory` VARCHAR(191) NOT NULL,
    `price_roullete` DECIMAL(9, 2) NOT NULL,
    `status` ENUM('ATIVA', 'INATIVA') NOT NULL DEFAULT 'INATIVA',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quotas` (
    `id` VARCHAR(191) NOT NULL,
    `roulleteId` VARCHAR(191) NOT NULL,
    `valueQuota` DECIMAL(9, 2) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Quotas_roulleteId_idx`(`roulleteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Solicitation` ADD CONSTRAINT `Solicitation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_solicitationId_fkey` FOREIGN KEY (`solicitationId`) REFERENCES `Solicitation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quotas` ADD CONSTRAINT `Quotas_roulleteId_fkey` FOREIGN KEY (`roulleteId`) REFERENCES `Roulletes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
