-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "positiveMarks" INTEGER NOT NULL DEFAULT 4,
    "negativeMarks" INTEGER NOT NULL DEFAULT -1
);
INSERT INTO "new_Question" ("answer", "id", "question") SELECT "answer", "id", "question" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE UNIQUE INDEX "Question_question_key" ON "Question"("question");
CREATE TABLE "new_Instance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "submited" BOOLEAN NOT NULL DEFAULT false,
    "end" TEXT,
    "value" TEXT,
    "result" TEXT,
    CONSTRAINT "Instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Instance" ("end", "id", "start", "userId", "value") SELECT "end", "id", "start", "userId", "value" FROM "Instance";
DROP TABLE "Instance";
ALTER TABLE "new_Instance" RENAME TO "Instance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
