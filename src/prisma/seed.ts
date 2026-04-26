import { Team } from "@/modules/quiniela/interfaces/team.interface";
import { PrismaClient } from "../generated/prisma/client";
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

  const teams: Team[] = [
    {
      name: 'América',
      logoUrl: '/teams/america.png'
    },
    {
      name: 'Atlas',
      logoUrl: '/teams/atlas.png'
    },
    {
      name: 'Cruz Azul',
      logoUrl: '/teams/cruz_azul.png'
    },
    {
      name: 'Guadalajara',
      logoUrl: '/teams/guadalajara.png'
    },
    {
      name: 'Pachuca',
      logoUrl: '/teams/pachuca.png'
    },
    {
      name: 'Pumas',
      logoUrl: '/teams/pumas.png'
    },
    {
      name: 'Tigres',
      logoUrl: '/teams/tigres.png'
    },
    {
      name: 'Toluca',
      logoUrl: '/teams/toluca.png'
    },
  ]

  for (const team of teams) {
    await prisma.team.upsert({
      where: {
        name_leagueId: {
          name: team.name,
          leagueId: league.id
        }
      },
      update: {},
      create: {
        name: team.name,
        leagueId: league.id,
        logoUrl: team.logoUrl
      }
    })
  }
}

main();