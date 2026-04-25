import { PrismaClient, Prisma } from "../application/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {

  // ejemplo: liga
  const league = await prisma.league.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Liga MX Clausura',
      year: 2026,
      status: true
    }
  })

  const teams = [
    'Rayados',
    'Tigres',
    'América',
    'Chivas',
    'Cruz Azul'
  ]

  for (const team of teams) {
    await prisma.team.upsert({
      where: {
        name_leagueId: {
          name: team,
          leagueId: league.id
        }
      },
      update: {},
      create: {
        name: team,
        leagueId: league.id
      }
    })
  }
}

main();