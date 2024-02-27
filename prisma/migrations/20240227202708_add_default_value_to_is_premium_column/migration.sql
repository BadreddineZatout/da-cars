-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Vehicle_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("address", "brandId", "description", "id", "isPremium", "name", "phone", "price") SELECT "address", "brandId", "description", "id", coalesce("isPremium", false) AS "isPremium", "name", "phone", "price" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
