/*
  Warnings:

  - A unique constraint covering the columns `[leagueId,name]` on the table `Jornada` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Jornada_leagueId_name_key" ON "Jornada"("leagueId", "name");
