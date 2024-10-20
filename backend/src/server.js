// src/server.js
import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

// Initialize the database
initDatabase()

console.log('Database initialization script executed.')

// Create a new post
const post = new Post({
  title: 'My first post',
  author: 'John Doe',
  contents: 'This is my first post. I hope you like it!',
  tags: ['first', 'post'],
})

// Save the post to the database and store the result in a constant
const createdPost = await post.save()
console.log('Post saved successfully.')

// Update the created post using findByIdAndUpdate
await Post.findByIdAndUpdate(createdPost._id, { title: 'Updated Post Title' })

// Find all posts in the database
const posts = await Post.find()
console.log('Posts found:', posts)
