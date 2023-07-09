/*
  Warnings:

  - You are about to drop the `_QpaperToQuestion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_QpaperToQuestion_B_index";

-- DropIndex
DROP INDEX "_QpaperToQuestion_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_QpaperToQuestion";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "qpaperId" INTEGER NOT NULL,
    CONSTRAINT "Section_qpaperId_fkey" FOREIGN KEY ("qpaperId") REFERENCES "Qpaper" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_QuestionToSection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QuestionToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuestionToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Qpaper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Qpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Qpaper" ("id", "title", "userId") SELECT "id", "title", "userId" FROM "Qpaper";
DROP TABLE "Qpaper";
ALTER TABLE "new_Qpaper" RENAME TO "Qpaper";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" INTEGER NOT NULL
);
INSERT INTO "new_Question" ("id", "question") SELECT "id", "question" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE UNIQUE INDEX "Question_question_key" ON "Question"("question");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToSection_AB_unique" ON "_QuestionToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToSection_B_index" ON "_QuestionToSection"("B");
