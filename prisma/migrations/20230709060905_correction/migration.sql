/*
  Warnings:

  - You are about to drop the column `negativeMarks` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `positiveMarks` on the `Question` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Qpaper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "userId" TEXT,
    "time" INTEGER NOT NULL DEFAULT 60,
    "instructions" TEXT,
    "positiveMarks" INTEGER NOT NULL DEFAULT 4,
    "negativeMarks" INTEGER NOT NULL DEFAULT -1,
    CONSTRAINT "Qpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Qpaper" ("id", "instructions", "time", "title", "userId") SELECT "id", "instructions", "time", "title", "userId" FROM "Qpaper";
DROP TABLE "Qpaper";
ALTER TABLE "new_Qpaper" RENAME TO "Qpaper";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" INTEGER NOT NULL
);
INSERT INTO "new_Question" ("answer", "id", "question") SELECT "answer", "id", "question" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE UNIQUE INDEX "Question_question_key" ON "Question"("question");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
