import { Post } from '../db/models/post.js';
import { User } from '../db/models/user.js';

// Create a new post
export async function createPost(userId, { title, contents, tags }) {
  const post = new Post({ title, author: userId, contents, tags });
  return await post.save();
}

// List posts with query and sorting options
export async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  // Convert sortOrder to a numeric value for MongoDB (-1 for descending, 1 for ascending)
  const order = sortOrder === 'ascending' ? 1 : -1;

  // Find posts based on the query, sort them, and populate the author field with username
  return await Post.find(query)
    .sort({ [sortBy]: order })
    .populate('author', 'username'); // Populate author details
}

// List all posts
export async function listAllPosts(options = {}) {
  // Pass an empty query to list all posts
  return await listPosts({}, options);
}

// List posts by a specific author
export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

// List posts by a specific tag
export async function listPostsByTag(tag, options = {}) {
  // Pass the tag as part of the query to filter posts by tags
  return await listPosts({ tags: tag }, options);
}

// Get a single post by its ID
export async function getPostById(postId) {
  // Use Mongoose's findById and populate to fetch the post along with author details
  const post = await Post.findById(postId).populate('author', 'username');
  return post;
}

// Update an existing post by its ID
export async function updatePost(userId, postId, { title, contents, tags }) {
  // Use Mongoose's findOneAndUpdate method with $set operator
  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  );

  return updatedPost;
}

// Delete an existing post by its ID
export async function deletePost(userId, postId) {
  // Use the deleteOne method to delete a post by its ID
  const result = await Post.deleteOne({ _id: postId, author: userId });
  return result;
}
