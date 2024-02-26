/*
  Warnings:

  - Added the required column `price` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    CONSTRAINT "Vehicle_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("address", "brandId", "description", "id", "name") SELECT "address", "brandId", "description", "id", "name" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
