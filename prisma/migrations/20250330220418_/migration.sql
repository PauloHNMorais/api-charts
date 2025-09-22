-- CreateTable
CREATE TABLE "Goal" (
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "salerId" INTEGER NOT NULL,
    "totalGoal" REAL NOT NULL,

    PRIMARY KEY ("year", "month", "salerId"),
    CONSTRAINT "Goal_salerId_fkey" FOREIGN KEY ("salerId") REFERENCES "Saler" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
