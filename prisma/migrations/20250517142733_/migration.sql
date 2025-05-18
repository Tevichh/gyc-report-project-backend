/*
  Warnings:

  - You are about to drop the column `tecnicoResponsable` on the `reportes` table. All the data in the column will be lost.
  - Added the required column `idTecnicoResponsable` to the `Reportes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reportes` DROP COLUMN `tecnicoResponsable`,
    ADD COLUMN `idTecnicoResponsable` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Reportes` ADD CONSTRAINT `Reportes_idTecnicoResponsable_fkey` FOREIGN KEY (`idTecnicoResponsable`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
