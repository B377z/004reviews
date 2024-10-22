export const getPosts = async (queryParams) => {
    const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
    new URLSearchParams(queryParams)
    );
    if (!res.ok) {
    throw new Error('Failed to fetch posts');
   }
    return res.json();
}

export const createPost = async (token, post) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
    },
    body: JSON.stringify(post),
});
    return await res.json();
}
