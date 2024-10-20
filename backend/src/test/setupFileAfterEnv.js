import mongoose from 'mongoose'
import { initDatabase } from '../db/init.js'

beforeAll(async () => {
  await initDatabase()
})

afterAll(async () => {
  await mongoose.disconnect()
})
