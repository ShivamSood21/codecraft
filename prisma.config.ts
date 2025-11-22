import 'dotenv/config'; // This loads your .env file settings
import { defineConfig } from "prisma/config"; // We don't need 'env' anymore!

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: `tsx prisma/seed.ts`
  },
  engine: "classic",
  datasource: {
    // THIS IS THE KEY FIX! Use the standard way:
    url: process.env.DATABASE_URL,
  },
});