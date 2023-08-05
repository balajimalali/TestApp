PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('ebf4d8a7-268f-473e-a915-b857acb07bfc','c392c5196651a02189a3249206517d2d0209b6d39456d2bded4d2ed39b69ae05',1688978262370,'20230615113755_init',NULL,NULL,1688978262176,1);
INSERT INTO _prisma_migrations VALUES('d7a8894d-eadf-4715-9728-99c1f645bea1','e7d6109c9bcb372c53eabf25246668dbcc00a210dbedef5d92c0432f8347065b',1688978262480,'20230615174454_ondelete',NULL,NULL,1688978262386,1);
INSERT INTO _prisma_migrations VALUES('58d262f4-6cb2-4bbc-9ceb-e963bd428e76','ce3e9041b33fd50963bc17bc094386d0c0bf906e665443715f761828a4b562be',1688978262789,'20230622111826_section',NULL,NULL,1688978262495,1);
INSERT INTO _prisma_migrations VALUES('cc66d31d-8b87-4f51-9438-c02ad1d84b5d','72949694c8c0433ae1284c8cd089221671a2f05986857988a6ab79b29b2d4947',1688978262906,'20230701170742_instructions',NULL,NULL,1688978262805,1);
INSERT INTO _prisma_migrations VALUES('c9ce05fe-7ee5-49e9-bb0d-52963a7846b5','779ffefa3315de9a4a086d79b4dfb95ba3a7786ae64c6c5ff4187a10fda9c1ea',1688978262974,'20230701185108_instance',NULL,NULL,1688978262924,1);
INSERT INTO _prisma_migrations VALUES('efb58632-6e22-4bef-8e44-a619769228ef','70902a045a9fd28c6ea2bbf8d5f53bbc1dfaffb8608793bfafdb96b910583b22',1688978263098,'20230701190843_instance_update',NULL,NULL,1688978262996,1);
INSERT INTO _prisma_migrations VALUES('2626e259-e8a0-47f9-8daf-5a0d4eccdc1d','46c256911110f0f8f5f57240b91d1cfb280289fd12689f7dc17947dc4b4b2aee',1688978263193,'20230701190908_abacd',NULL,NULL,1688978263118,1);
INSERT INTO _prisma_migrations VALUES('e4770d59-ac39-42eb-b4a4-5cc142829e02','65ad16897d6ccba53c7f32c5e8f02ce15c4b8aa89ec5ecab9b51d32aa17d13a1',1688978263374,'20230709053040_evalv',NULL,NULL,1688978263213,1);
INSERT INTO _prisma_migrations VALUES('bd6b6b58-0b00-469d-8a10-c08d99689abe','788ddf0cac5897a16fe9d0047ed9e06b51421895990304271dc951a4aebe5c4e',1688978263569,'20230709060905_correction',NULL,NULL,1688978263390,1);
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PUBLIC'
);
INSERT INTO User VALUES('5ac31b03-277b-49de-80b6-d2a1fa15c1b7','balajimalali','balaji',NULL,'balaji@gamil.com','$2b$10$Lqvv/bL67XVqr7dIgqbL/e7ETgAC2WAbtqOl9gHU3JOr7l6YU20gS','PUBLIC');
CREATE TABLE IF NOT EXISTS "Option" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "questionsId" INTEGER NOT NULL,
    CONSTRAINT "Option_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO Option VALUES(1,'Peninsula',1);
INSERT INTO Option VALUES(2,'the Gulf of Mexico',1);
INSERT INTO Option VALUES(3,'Strait ',1);
INSERT INTO Option VALUES(4,'Island ',1);
INSERT INTO Option VALUES(5,'India',2);
INSERT INTO Option VALUES(6,'South Africa',2);
INSERT INTO Option VALUES(7,'Arabia',2);
INSERT INTO Option VALUES(8,'Rohtas Pass',3);
INSERT INTO Option VALUES(9,'Mana Pass',3);
INSERT INTO Option VALUES(10,'Niti Pass',3);
INSERT INTO Option VALUES(11,'Nathula Pass',3);
INSERT INTO Option VALUES(12,'Nehru and Ambedkar',4);
INSERT INTO Option VALUES(13,'Gandhi and Ambedkar',4);
INSERT INTO Option VALUES(14,'Malaviya and Ambedkar',4);
INSERT INTO Option VALUES(15,'Gandhi and Nehru',4);
INSERT INTO Option VALUES(16,'Bal Gangadhar Tilak',5);
INSERT INTO Option VALUES(17,'Raja Rammohan Roy',5);
INSERT INTO Option VALUES(18,'J.A.Hickey',5);
INSERT INTO Option VALUES(19,'Lord William Bentinck',5);
INSERT INTO Option VALUES(20,'Mahatma Gandhi',6);
INSERT INTO Option VALUES(21,'Rabindranath Tagore',6);
INSERT INTO Option VALUES(22,'Bankim Chandra Chatterjee',6);
INSERT INTO Option VALUES(23,'Sarat Chandra Chatterjee',6);
CREATE TABLE IF NOT EXISTS "Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "qpaperId" INTEGER NOT NULL,
    CONSTRAINT "Section_qpaperId_fkey" FOREIGN KEY ("qpaperId") REFERENCES "Qpaper" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Section VALUES(1,'Geography',1);
INSERT INTO Section VALUES(2,'History',1);
CREATE TABLE IF NOT EXISTS "_QuestionToSection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QuestionToSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuestionToSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO _QuestionToSection VALUES(1,1);
INSERT INTO _QuestionToSection VALUES(2,1);
INSERT INTO _QuestionToSection VALUES(3,1);
INSERT INTO _QuestionToSection VALUES(4,2);
INSERT INTO _QuestionToSection VALUES(5,2);
INSERT INTO _QuestionToSection VALUES(6,2);
CREATE TABLE IF NOT EXISTS "Instance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "submited" BOOLEAN NOT NULL DEFAULT false,
    "end" TEXT,
    "value" TEXT,
    "result" TEXT,
    CONSTRAINT "Instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Qpaper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "userId" TEXT,
    "time" INTEGER NOT NULL DEFAULT 60,
    "instructions" TEXT,
    "positiveMarks" INTEGER NOT NULL DEFAULT 4,
    "negativeMarks" INTEGER NOT NULL DEFAULT -1,
    CONSTRAINT "Qpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO Qpaper VALUES(1,'Demo Test','5ac31b03-277b-49de-80b6-d2a1fa15c1b7',5,'Try and enjoy the demo exam in our application.',4,0);
CREATE TABLE IF NOT EXISTS "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" INTEGER NOT NULL
);
INSERT INTO Question VALUES(1,'Which one of the following geographical terms refers to the “water-surrounded sliver of sub-continental land”?',4);
INSERT INTO Question VALUES(2,'Which one of the following is the biggest peninsula on the planet?',7);
INSERT INTO Question VALUES(3,'Which one of the following passes connects Manali and Leh by road and cuts across the Pir Panjal range?',8);
INSERT INTO Question VALUES(4,'The Poona Pact (1932) was an agreement between?',13);
INSERT INTO Question VALUES(5,'Who started the first English newspaper in India?',18);
INSERT INTO Question VALUES(6,'Who is the author of Vande Mataram?',22);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Qpaper',1);
INSERT INTO sqlite_sequence VALUES('Question',6);
INSERT INTO sqlite_sequence VALUES('Section',2);
INSERT INTO sqlite_sequence VALUES('Option',23);
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "_QuestionToSection_AB_unique" ON "_QuestionToSection"("A", "B");
CREATE INDEX "_QuestionToSection_B_index" ON "_QuestionToSection"("B");
CREATE UNIQUE INDEX "Question_question_key" ON "Question"("question");
COMMIT;
