import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts.js";
import { useState } from "react";

export function CreatePost() {
  // Move useState inside the CreatePost function
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [contents, setContents] = useState('');

  const queryClient = useQueryClient();

  // Move useMutation inside the CreatePost function
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
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
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-author">Author: </label>
        <input
          type="text"
          name="create-author"
          id="create-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
