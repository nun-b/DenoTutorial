import { config } from "https://deno.land/x/dotenv/mod.ts"
const env = config()

const dbPostgres = {
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASS,
    hostname: "localhost",
    port: 5432
}

export { dbPostgres }