import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { defineConfig } from "prisma/config";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is NOT loaded");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: dbUrl,
  },
  migrations: {
    seed: "ts-node prisma/seed.ts",
  }
});