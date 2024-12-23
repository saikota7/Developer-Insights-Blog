import React, { useState, useEffect } from 'react';
import "../styles/EditPostForm.css"

function EditPostForm({ post, updatePost }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPost = {
      ...post,
      title,
      content,
    };

    updatePost(updatedPost);
  };

  return (
    <div className="edit-post-form">
    <h1>Edit Post</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Post</button>
    </form>
  </div>
  );
}

export default EditPostForm;
