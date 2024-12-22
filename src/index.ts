import {serve} from '@hono/node-server'

// @ts-ignore
import app from './routes.ts'

const port = 4000
console.log(`Server is running on http://localhost:${port}`)

serve({
    fetch: app.fetch,
    port,
})
