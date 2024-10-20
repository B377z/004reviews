import PropTypes from 'prop-types';

export function Post({ title, contents, author }) {
    return (
        <article>
            <h3>{title}</h3>
            <div>{contents}</div>
            {author && (
                <em>
                  <br />
                    Written by {author}
                </em>
            )}
        </article>
    )
}

// Define prop types for type-checking
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  author: PropTypes.string
};