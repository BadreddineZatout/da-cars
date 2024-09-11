/*
  Warnings:

  - You are about to drop the column `name` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `service` table. All the data in the column will be lost.
  - Added the required column `name_de` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_fr` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_de` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_fr` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `name`,
    ADD COLUMN `name_de` VARCHAR(191) NOT NULL,
    ADD COLUMN `name_fr` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `name`,
    ADD COLUMN `name_de` VARCHAR(191) NOT NULL,
    ADD COLUMN `name_fr` VARCHAR(191) NOT NULL;
