// src/__tests__/posts.test.js
import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import { Post } from '../db/models/post.js' // Import the Post model
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/posts.js' // Import the createPost service function

// Define a group of tests related to creating posts
describe('creating posts', () => {
  // Define the first test case
  test('creating posts with all parameters should succeed', async () => {
    // Define post data
    const post = {
      title: 'Test Post',
      author: 'Jane Doe',
      contents: 'This is a test post.',
      tags: ['test', 'jest'],
    }

    // Create a new post using the createPost function
    const createdPost = await createPost(post)

    // Verify that the post was created with the correct data
    expect(createdPost.title).toBe(post.title)
    expect(createdPost.author).toBe(post.author)
    expect(createdPost.contents).toBe(post.contents)
    expect(createdPost.tags).toEqual(post.tags)

    // Verify that the post has an _id of type ObjectId
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    // Check that the post has createdAt and updatedAt timestamps
    expect(createdPost).toHaveProperty('createdAt')
    expect(createdPost).toHaveProperty('updatedAt')

    // Find the post directly using Mongoose and verify it exists
    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).not.toBeNull()

    // Verify that the found post contains at least the properties of the original postData
    expect(foundPost).toEqual(
      expect.objectContaining({
        title: post.title,
        author: post.author,
        contents: post.contents,
        tags: post.tags,
      }),
    )

    // Verify that the created post has createdAt and updatedAt timestamps
    expect(foundPost).toHaveProperty('createdAt')
    expect(foundPost).toHaveProperty('updatedAt')
  })

  // Define the second test case with try/catch
  test('creating posts without title should fail', async () => {
    // Define post data without a title
    const post = {
      author: 'Jane Doe',
      contents: 'This is a test post without a title.',
      tags: ['test', 'jest'],
    }

    try {
      // Try creating a post without a title
      await createPost(post)
    } catch (error) {
      // Expect the error to be a Mongoose ValidationError
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.errors.title).toBeDefined() // Check that the error has a title property
    }
  })

  // Define the third test case
  test('creating posts with minimal parameters should succeed', async () => {
    // Define post data with only a title
    const post = {
      title: 'Minimal Post',
    }

    // Create a new post using the createPost function
    const createdPost = await createPost(post)

    // Verify that the post was created with the correct data
    expect(createdPost.title).toBe(post.title)

    // Verify that the post has an _id of type ObjectId
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    // Check that the post has createdAt and updatedAt timestamps
    expect(createdPost).toHaveProperty('createdAt')
    expect(createdPost).toHaveProperty('updatedAt')
  })
})

// Define an array of sample posts
const samplePosts = [
  {
    title: 'Introduction to JavaScript',
    author: 'Jane Doe',
    contents: 'This is a post about JavaScript fundamentals.',
    tags: ['JavaScript', 'Programming', 'Basics'],
  },
  {
    title: 'Advanced Node.js',
    author: 'John Doe',
    contents: 'In this post, we explore advanced Node.js concepts.',
    tags: ['Node.js', 'JavaScript', 'Backend'],
  },
  {
    title: 'React for Beginners',
    author: 'Jane Doe',
    contents: 'A beginner-friendly introduction to React.',
    tags: ['React', 'JavaScript', 'Frontend'],
  },
  {
    title: 'Understanding MongoDB',
    author: 'Alice Smith',
    contents: 'This post covers the basics of using MongoDB as a database.',
    tags: ['MongoDB', 'Database', 'NoSQL'],
  },
  {
    title: 'CSS Tips and Tricks',
    author: 'John Doe',
    contents: 'A collection of useful CSS tips for frontend developers.',
    tags: ['CSS', 'Frontend', 'Design'],
  },
]

let createdSamplePosts = [] // Fixed the variable name

// Define a group of tests related to listing posts
beforeEach(async () => {
  // Define a beforeEach function to reset the database and the array of created posts
  await Post.deleteMany({}) // Delete all posts from the database

  createdSamplePosts = [] // Reset the array of created posts

  // Create and save posts based on the sample data
  for (const post of samplePosts) {
    const createdPost = new Post(post) // Create a new post using the sample data
    createdSamplePosts.push(await createdPost.save()) // Save the post and add it to the array
  }
})

describe('listing posts', () => {
  test('listing all posts should return all posts', async () => {
    const posts = await listAllPosts()

    // Sort createdSamplePosts by createdAt descending
    const sortedSamplePosts = [...createdSamplePosts].sort(
      (a, b) => b.createdAt - a.createdAt,
    )

    expect(posts.length).toEqual(sortedSamplePosts.length)

    posts.forEach((post, index) => {
      expect(post.title).toEqual(sortedSamplePosts[index].title)
      expect(post.author).toEqual(sortedSamplePosts[index].author)
      expect(post.contents).toEqual(sortedSamplePosts[index].contents)
      expect(post.tags).toEqual(sortedSamplePosts[index].tags)
    })
  })

  // New test case to verify default sort order
  test('default sort order should show newest posts first', async () => {
    // Manually sort createdSamplePosts by createdAt in descending order
    const sortedSamplePosts = [...createdSamplePosts].sort(
      (a, b) => b.createdAt - a.createdAt,
    )

    const posts = await listAllPosts() // List all posts using the listAllPosts function

    // Verify that the returned posts are sorted by createdAt in descending order
    posts.forEach((post, index) => {
      expect(post.createdAt).toEqual(sortedSamplePosts[index].createdAt)
    })
  })

  // New test case to verify sort by updatedAt in ascending order
  test('sort by updatedAt in ascending order should show oldest updated posts first', async () => {
    // Manually sort createdSamplePosts by updatedAt in ascending order
    const sortedByUpdatedAt = [...createdSamplePosts].sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )

    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    }) // List all posts using the listAllPosts function with sort options

    // Verify that the returned posts are sorted by updatedAt in ascending order
    posts.forEach((post, index) => {
      expect(post.updatedAt).toEqual(sortedByUpdatedAt[index].updatedAt)
    })
  })

  // New test case for listing posts by author
  test('listing posts by author should return posts by the specified author', async () => {
    const author = 'Jane Doe'
    const postsByAuthor = await listPostsByAuthor(author)

    const expectedPosts = createdSamplePosts
      .filter((post) => post.author === author)
      .sort((a, b) => b.createdAt - a.createdAt)

    expect(postsByAuthor.length).toEqual(expectedPosts.length)

    postsByAuthor.forEach((post, index) => {
      expect(post.title).toEqual(expectedPosts[index].title)
      expect(post.author).toEqual(expectedPosts[index].author)
      expect(post.contents).toEqual(expectedPosts[index].contents)
      expect(post.tags).toEqual(expectedPosts[index].tags)
    })
  })

  // New test case for listing posts by tag
  test('listing posts by tag should return posts with the specified tag', async () => {
    const tag = 'JavaScript'
    const postsByTag = await listPostsByTag(tag)

    const expectedPosts = createdSamplePosts
      .filter((post) => post.tags.includes(tag))
      .sort((a, b) => b.createdAt - a.createdAt)

    expect(postsByTag.length).toEqual(expectedPosts.length)

    postsByTag.forEach((post, index) => {
      expect(post.title).toEqual(expectedPosts[index].title)
      expect(post.author).toEqual(expectedPosts[index].author)
      expect(post.contents).toEqual(expectedPosts[index].contents)
      expect(post.tags).toEqual(expectedPosts[index].tags)
    })
  })
})

describe('getting a post', () => {
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  test('should fail if the id does not exist', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toEqual(null)
  })
})

describe('updating posts', () => {
  // Test to verify that the specified property is updated correctly
  test('should update the specified property', async () => {
    // Update the "author" field of the first sample post
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })

    // Retrieve the updated post from the database
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)

    // Verify that the "author" field has been updated
    expect(updatedPost.author).toEqual('Test Author')
  })

  // Test to verify that other properties remain unchanged
  test('should not update other properties', async () => {
    // Update the "author" field of the first sample post
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })

    // Retrieve the updated post from the database
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)

    // Verify that the "title" field remains unchanged
    expect(updatedPost.title).toEqual(createdSamplePosts[0].title)

    // Verify that the "contents" field remains unchanged
    expect(updatedPost.contents).toEqual(createdSamplePosts[0].contents)

    // Verify that the "tags" field remains unchanged
    expect(updatedPost.tags).toEqual(createdSamplePosts[0].tags)
  })
})

describe('updating posts', () => {
  // Test to verify that the specified property is updated correctly
  test('should update the specified property', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.author).toEqual('Test Author')
  })

  // Test to verify that other properties remain unchanged
  test('should not update other properties', async () => {
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toEqual(createdSamplePosts[0].title)
    expect(updatedPost.contents).toEqual(createdSamplePosts[0].contents)
    expect(updatedPost.tags).toEqual(createdSamplePosts[0].tags)
  })

  // Test to verify that the updatedAt timestamp is updated
  test('should update the updatedAt timestamp', async () => {
    const initialUpdatedAt = createdSamplePosts[0].updatedAt

    // Update a property to trigger a change in the updatedAt timestamp
    await updatePost(createdSamplePosts[0]._id, {
      author: 'Test Author',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)

    // Verify that the updatedAt timestamp is greater than the initial updatedAt timestamp
    expect(new Date(updatedPost.updatedAt).getTime()).toBeGreaterThan(
      new Date(initialUpdatedAt).getTime(),
    )
  })
})

test('should return null when no post with the matching ID is found', async () => {
  const nonExistentId = new mongoose.Types.ObjectId() // Create a new non-existent ID
  const result = await updatePost(nonExistentId, { title: 'Non-existent Post' })

  expect(result).toBeNull() // Verify that the result is null
})

describe('deleting posts', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(createdSamplePosts[0]._id)
    expect(result.deletedCount).toEqual(1)
    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(deletedPost).toEqual(null)
  })
  test('should fail if the id does not exist', async () => {
    const result = await deletePost('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
