-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Instance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT,
    "value" TEXT NOT NULL,
    CONSTRAINT "Instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Instance" ("end", "id", "start", "userId", "value") SELECT "end", "id", "start", "userId", "value" FROM "Instance";
DROP TABLE "Instance";
ALTER TABLE "new_Instance" RENAME TO "Instance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
