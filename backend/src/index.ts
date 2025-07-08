import 'dotenv/config'
import app from './server'

const port = Number(process.env.PORT) || 3333

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://0.0.0.0:${port}`)
})