// src/routes/posts.js
import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js'

export function postsRoutes(app) {
  // Define the routes here
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }

    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'You can only filter by author or tag, not both' })
      } else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        return res.json(await listPostsByTag(tag, options))
      } else {
        return res.json(await listAllPosts(options))
      }
    } catch (error) {
      console.error('Error while getting posts', error)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }
      return res.json(post)
    } catch (error) {
      console.error('Error while getting post by id', error)
      return res.status(500).end()
    }
  })

  app.post('/api/v1/posts', async (req, res) => {
    try {
      const post = await createPost(req.body)
      return res.json(post)
    } catch (error) {
      console.error('Error while creating post', error)
      return res.status(500).end()
    }
  })

  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body)
      if (!post) {
        return res.status(404).json({ error: 'Post not found' })
      }
      return res.json(post)
    } catch (error) {
      console.error('Error while updating post', error)
      return res.status(500).end()
    }
  })

  // DELETE route to delete a post by ID
  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const result = await deletePost(req.params.id)
      if (!result || result.deletedCount === 0) {
        return res.status(404).json({ error: 'Post not found' })
      }
      return res.status(204).end() // 204 No Content indicates successful deletion with no response body
    } catch (error) {
      console.error('Error while deleting post', error)
      return res.status(500).end()
    }
  })
}
