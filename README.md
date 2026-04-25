This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Correr seeder
```
npx prisma db seed
```

## Correr migraciones
```
npx prisma migrate dev --name init
```

## Abrir prisma studio
```
npx prisma studio
```

## DEV
1.- Correr
```
npx create-db
```

2.- Correr migraciones 
3.- Despues de correr migraciones se debe correr:
```
npx prisma generate
```