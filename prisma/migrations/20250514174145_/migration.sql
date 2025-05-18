/*
  Warnings:

  - Added the required column `urlFoto` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `region` VARCHAR(50) NULL,
    ADD COLUMN `urlFoto` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `Reportes` (
    `idReporte` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaInicio` DATETIME(3) NULL,
    `fechafin` DATETIME(3) NULL,
    `tipoActividad` VARCHAR(191) NOT NULL,
    `NoTicket` VARCHAR(191) NOT NULL,
    `sistema` VARCHAR(191) NOT NULL,
    `zona` VARCHAR(191) NULL,
    `locacion` VARCHAR(191) NULL,
    `cliente` VARCHAR(191) NOT NULL,
    `nombrePunto` VARCHAR(191) NOT NULL,
    `descripcionSolicitud` VARCHAR(191) NOT NULL,
    `descripcionActividad` VARCHAR(191) NOT NULL,
    `SolucionoRequimiento` BOOLEAN NULL DEFAULT false,
    `nuevaIntervencion` BOOLEAN NULL DEFAULT false,
    `tecnicoResponsable` VARCHAR(191) NOT NULL,
    `estado` ENUM('Finalizado', 'Pendiente', 'En_Proceso', 'Cancelado') NOT NULL,

    PRIMARY KEY (`idReporte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquiposIntervenidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipo` VARCHAR(191) NOT NULL,
    `serial` VARCHAR(191) NOT NULL,
    `estado` ENUM('Cambio', 'Mantenimiento', 'Suministro_Retiro', 'No_Aplica') NOT NULL,
    `serialAnterior` VARCHAR(191) NULL,
    `reportId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnexoFotografico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `reportId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EquiposIntervenidos` ADD CONSTRAINT `EquiposIntervenidos_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Reportes`(`idReporte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnexoFotografico` ADD CONSTRAINT `AnexoFotografico_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Reportes`(`idReporte`) ON DELETE RESTRICT ON UPDATE CASCADE;
