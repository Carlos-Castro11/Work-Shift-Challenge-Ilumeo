import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import { router } from './routes'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  }),
)
app.use(router)

export default app
