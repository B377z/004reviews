import Mongoose, { Schema } from 'mongoose' // Import Mongoose from the mongoose package

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    contents: String,
    tags: [String],
  },
  { timestamps: true },
) // Define a schema for a post with a title, author, contents, and tags

export const Post = Mongoose.model('Post', postSchema) // Create a model named 'Post' from the postSchema
