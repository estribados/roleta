-- CreateTable
CREATE TABLE `user` (
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
    `user_profit` DECIMAL(9, 3) NULL DEFAULT 0,
    `bonus` DECIMAL(9, 3) NULL DEFAULT 0,
    `accumulated` DECIMAL(9, 3) NULL DEFAULT 0,
    `house_profit` DECIMAL(9, 3) NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `solicitation` (
    `id` VARCHAR(191) NOT NULL,
    `value_solicitation` DECIMAL(9, 2) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('PAGO', 'SOLICITADO', 'RECUSADO') NOT NULL DEFAULT 'SOLICITADO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `solicitation_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `solicitationId` VARCHAR(191) NULL,
    `visualized` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `notifications_userId_idx`(`userId`),
    INDEX `notifications_solicitationId_idx`(`solicitationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roulletes` (
    `id` VARCHAR(191) NOT NULL,
    `nameCategory` VARCHAR(191) NOT NULL,
    `percentageRoullete` INTEGER NULL,
    `price_roullete` DECIMAL(9, 2) NOT NULL,
    `status` ENUM('ATIVA', 'INATIVA') NOT NULL DEFAULT 'INATIVA',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotas` (
    `id` VARCHAR(191) NOT NULL,
    `roulleteId` VARCHAR(191) NOT NULL,
    `valueQuota` DECIMAL(9, 2) NOT NULL,
    `percentQuota` DECIMAL(9, 2) NULL,
    `color` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `quotas_roulleteId_idx`(`roulleteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `solicitation` ADD CONSTRAINT `solicitation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_solicitationId_fkey` FOREIGN KEY (`solicitationId`) REFERENCES `solicitation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotas` ADD CONSTRAINT `quotas_roulleteId_fkey` FOREIGN KEY (`roulleteId`) REFERENCES `roulletes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
