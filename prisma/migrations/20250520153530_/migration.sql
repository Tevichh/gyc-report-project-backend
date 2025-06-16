/*
  Warnings:

  - Made the column `serialAnterior` on table `equipos_intervenidos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `anexo_fotografico` MODIFY `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `equipos_intervenidos` MODIFY `serialAnterior` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reportes` MODIFY `tipoActividad` VARCHAR(191) NULL,
    MODIFY `NoTicket` VARCHAR(191) NULL,
    MODIFY `sistema` VARCHAR(191) NULL,
    MODIFY `cliente` VARCHAR(191) NULL,
    MODIFY `nombrePunto` VARCHAR(191) NULL,
    MODIFY `descripcionSolicitud` VARCHAR(191) NULL,
    MODIFY `descripcionActividad` VARCHAR(191) NULL;
