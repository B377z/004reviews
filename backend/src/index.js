import { app } from './app.js'
import dotenv from 'dotenv'
import { initDatabase } from './db/init.js'

dotenv.config()

try {
  await initDatabase()
  const PORT = process.env.PORT || 3000
  app.listen(PORT)
  console.log(`Server is running on http://localhost:${PORT}`)
} catch (error) {
  console.error('Error while connecting to the database', error)
}
