import { Post } from '../db/models/post.js'

export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}

// List posts with query and sorting options
export async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  // Convert sortOrder to a numeric value for MongoDB (-1 for descending, 1 for ascending)
  const order = sortOrder === 'ascending' ? 1 : -1

  // Find posts based on the query and sort them using .find() and .sort()
  return await Post.find(query).sort({ [sortBy]: order })
}

// List all posts
export async function listAllPosts(options = {}) {
  // Pass an empty query to list all posts
  return await listPosts({}, options)
}

// List posts by a specific author
export async function listPostsByAuthor(author, options = {}) {
  // Pass the author field as part of the query to filter posts by author
  return await listPosts({ author }, options)
}

// List posts by a specific tag
export async function listPostsByTag(tag, options = {}) {
  // Pass the tag as part of the query to filter posts by tags
  return await listPosts({ tags: tag }, options)
}

// Get a single post by its ID
export async function getPostById(postId) {
  // Use Mongoose's findById method to fetch the post by its ID
  const post = await Post.findById(postId)
  return post
}

// Update an existing post by its ID
export async function updatePost(postId, updatedParams) {
  // Use Mongoose's findOneAndUpdate method with $set operator
  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId },
    { $set: updatedParams },
    { new: true },
  )

  return updatedPost
}

// Delete an existing post by its ID
export async function deletePost(postId) {
  // Use the deleteOne method to delete a post by its ID
  const result = await Post.deleteOne({ _id: postId })
  return result
}
