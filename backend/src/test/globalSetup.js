// src/test/globalSetup.js
import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create()
  process.env.DATABASE_URL = instance.getUri()
  console.log('In-memory MongoDB server started', process.env.DATABASE_URL)
  global.__MONGOINSTANCE = instance
}
