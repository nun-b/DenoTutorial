// deno run --allow-net --allow-read AppPostgres.ts
import { Application, Router  } from 'https://deno.land/x/oak/mod.ts'
import { config } from "https://deno.land/x/dotenv/mod.ts"
import router from './routers.ts'
import NotFound from './pages/404.ts'

const env = config()
const port: number = +env.APP_PORT || 4000
const host: string = env.APP_HOST || 'http://localhost'

const app = new Application()
app.use(router.routes())
app.use(NotFound)

console.log(`server :: ${host}:${port}`)
await app.listen({ port })