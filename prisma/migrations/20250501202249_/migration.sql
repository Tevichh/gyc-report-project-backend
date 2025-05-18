/*
  Warnings:

  - You are about to drop the column `correo` on the `cuenta` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `cuenta` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `cuenta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Cuenta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Cuenta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Cuenta` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Cuenta_correo_key` ON `cuenta`;

-- AlterTable
ALTER TABLE `cuenta` DROP COLUMN `correo`,
    DROP COLUMN `creadoEn`,
    DROP COLUMN `passwordHash`,
    ADD COLUMN `createdAT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Cuenta_email_key` ON `Cuenta`(`email`);
