import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

// Define the PostList function component
export function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

// Define prop types for type-checking
PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      contents: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired, // Update author to be an object
      }),
    })
  ).isRequired,
};
