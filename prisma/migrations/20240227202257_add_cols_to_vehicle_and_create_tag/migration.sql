-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN "isPremium" BOOLEAN;
ALTER TABLE "Vehicle" ADD COLUMN "phone" TEXT;

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    CONSTRAINT "Tag_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
