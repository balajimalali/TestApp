-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PUBLIC'
);

-- CreateTable
CREATE TABLE "Qpaper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Qpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Option" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "questionsId" INTEGER NOT NULL,
    CONSTRAINT "Option_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_QpaperToQuestion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QpaperToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Qpaper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QpaperToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Question_question_key" ON "Question"("question");

-- CreateIndex
CREATE UNIQUE INDEX "_QpaperToQuestion_AB_unique" ON "_QpaperToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_QpaperToQuestion_B_index" ON "_QpaperToQuestion"("B");
