-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT,
    "serviceId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    CONSTRAINT "Reservation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reservation_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("date", "email", "first_name", "id", "itemId", "last_name", "phone_number", "serviceId", "status") SELECT "date", "email", "first_name", "id", "itemId", "last_name", "phone_number", "serviceId", "status" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE TABLE "new_VehicleMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    CONSTRAINT "VehicleMedia_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_VehicleMedia" ("id", "name", "path", "vehicleId") SELECT "id", "name", "path", "vehicleId" FROM "VehicleMedia";
DROP TABLE "VehicleMedia";
ALTER TABLE "new_VehicleMedia" RENAME TO "VehicleMedia";
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    CONSTRAINT "Item_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("id", "name", "price", "serviceId") SELECT "id", "name", "price", "serviceId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    CONSTRAINT "Feature_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Feature" ("id", "name", "vehicleId") SELECT "id", "name", "vehicleId" FROM "Feature";
DROP TABLE "Feature";
ALTER TABLE "new_Feature" RENAME TO "Feature";
CREATE TABLE "new_Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "owner" TEXT NOT NULL DEFAULT 'Anonymous Owner',
    CONSTRAINT "Vehicle_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("address", "brandId", "description", "id", "isPremium", "name", "owner", "phone", "price", "rating") SELECT "address", "brandId", "description", "id", "isPremium", "name", "owner", "phone", "price", "rating" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE TABLE "new_TagsOnVehicles" (
    "vehicleId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("vehicleId", "tagId"),
    CONSTRAINT "TagsOnVehicles_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TagsOnVehicles_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TagsOnVehicles" ("tagId", "value", "vehicleId") SELECT "tagId", "value", "vehicleId" FROM "TagsOnVehicles";
DROP TABLE "TagsOnVehicles";
ALTER TABLE "new_TagsOnVehicles" RENAME TO "TagsOnVehicles";
CREATE TABLE "new_Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Brand_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Brand" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Brand" ("createdAt", "id", "name", "parentId", "updatedAt") SELECT "createdAt", "id", "name", "parentId", "updatedAt" FROM "Brand";
DROP TABLE "Brand";
ALTER TABLE "new_Brand" RENAME TO "Brand";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
