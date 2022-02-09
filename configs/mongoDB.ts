import { config } from "https://deno.land/x/dotenv/mod.ts"
import { MongoClient } from 'https://deno.land/x/mongo@v0.29.1/mod.ts'

const env = config()
const client = new MongoClient();
await client.connect(`mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASS}@${env.MONGO_CLUSTER}.rfwgi.mongodb.net/${env.MONGO_DB}?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1`);

const db = client.database('deno')

export default db;
