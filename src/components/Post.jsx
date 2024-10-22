import PropTypes from 'prop-types';


export function Post({ title, contents, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents ? contents : 'No content available'}</div> {/* Fallback value for contents */}
      {author && (
        <em>
          <br />
          Written by {typeof author === 'object' ? author.username : author}
        </em>
      )}
    </article>
  );
}

// Define prop types for type-checking
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string, // Make this optional to avoid warnings when it's missing
  author: PropTypes.shape({
    username: PropTypes.string.isRequired, // Update `author` to be an object with `username`
  }),
};
