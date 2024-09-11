/*
  Warnings:

  - You are about to drop the column `description` on the `service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `service` DROP COLUMN `description`,
    ADD COLUMN `description_de` VARCHAR(191) NULL,
    ADD COLUMN `description_fr` VARCHAR(191) NULL;
