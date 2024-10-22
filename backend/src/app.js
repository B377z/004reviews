import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(
  cors({
    origin: '*', // Allow your frontend's URL
  }),
)
app.use(bodyParser.json())

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' http://localhost:3001",
  )
  next()
})

postsRoutes(app)
userRoutes(app)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Blog API!',
  })
})

export { app }