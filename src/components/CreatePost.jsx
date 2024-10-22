import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts.js";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export function CreatePost() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const queryClient = useQueryClient();
  const [token] = useAuth(); // Get the token from the AuthContext

  // Move useMutation inside the CreatePost function
  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents }), // Pass token here
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']); // Refresh the posts list
      setTitle('');
      setContents('');
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
      alert('Failed to create post!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-contents">Contents: </label>
        <textarea
          name="create-contents"
          id="create-contents"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          required
        />
      </div>
      <br />
      <input
        type="submit"
        value={createPostMutation.isLoading ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isLoading}
      />
      {createPostMutation.isSuccess && (
        <>
          <br />
          Post created successfully!
        </>
      )}
    </form>
  );
}
