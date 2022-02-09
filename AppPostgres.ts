// deno run --allow-net --allow-read --unstable AppPostgres.ts
import { Application } from 'https://deno.land/x/oak/mod.ts'
import { config } from "https://deno.land/x/dotenv/mod.ts"
import router from './routers.ts'
import NotFound from './controllers/404.ts'

const env = config()
const port: number = +env.APP_PORT || 4000
const host: string = env.APP_HOST || 'http://localhost'

const app = new Application()
app.use(router.routes())
app.use(NotFound)

await app.listen({ port })
console.log(`server :: ${host}:${port}`)