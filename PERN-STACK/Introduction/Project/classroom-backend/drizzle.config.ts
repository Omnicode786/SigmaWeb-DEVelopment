import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in .env file');
}

export default defineConfig({
    // use the index that exports all schema files so Drizzle sees `user` and related tables
    schema: "./src/db/schema/index.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    }
});
