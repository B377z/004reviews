import mongoose from 'mongoose'

export function initDatabase() {
  const DATABASE_URL =
    process.env.DATABASE_URL || 'mongodb://localhost:27017/reviews'
  mongoose.connect(DATABASE_URL)

  mongoose.connection.on('connected', () => {
    console.info(
      'Connected to the MongoDB database successfully:',
    )
  })
}
