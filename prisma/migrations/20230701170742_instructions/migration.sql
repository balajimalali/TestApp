-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Qpaper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "userId" TEXT,
    "time" INTEGER NOT NULL DEFAULT 60,
    "instructions" TEXT,
    CONSTRAINT "Qpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Qpaper" ("id", "title", "userId") SELECT "id", "title", "userId" FROM "Qpaper";
DROP TABLE "Qpaper";
ALTER TABLE "new_Qpaper" RENAME TO "Qpaper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
