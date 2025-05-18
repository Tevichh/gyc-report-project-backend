/*
  Warnings:

  - You are about to drop the `anexofotografico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equiposintervenidos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `anexofotografico` DROP FOREIGN KEY `AnexoFotografico_reportId_fkey`;

-- DropForeignKey
ALTER TABLE `equiposintervenidos` DROP FOREIGN KEY `EquiposIntervenidos_reportId_fkey`;

-- DropTable
DROP TABLE `anexofotografico`;

-- DropTable
DROP TABLE `equiposintervenidos`;

-- CreateTable
CREATE TABLE `Equipos_Intervenidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipo` VARCHAR(191) NOT NULL,
    `serial` VARCHAR(191) NOT NULL,
    `estado` ENUM('Cambio', 'Mantenimiento', 'Suministro_Retiro', 'No_Aplica') NOT NULL,
    `serialAnterior` VARCHAR(191) NULL,
    `reportId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anexo_Fotografico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `reportId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Equipos_Intervenidos` ADD CONSTRAINT `Equipos_Intervenidos_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Reportes`(`idReporte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anexo_Fotografico` ADD CONSTRAINT `Anexo_Fotografico_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Reportes`(`idReporte`) ON DELETE RESTRICT ON UPDATE CASCADE;
