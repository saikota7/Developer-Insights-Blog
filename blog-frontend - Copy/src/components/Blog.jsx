import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPostForm from './EditPostForm';  // Import the EditPostForm component
import '../styles/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);  // Added state for editing

  // Fetch posts on component mount
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts/')
      .then(response => {
        setPosts(response.data);  // Set the fetched posts
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Handle new post creation
  const handleCreatePost = () => {
    if (!title || !content) {
      alert('Title and Content are required!');
      return;
    }
    axios.post('http://127.0.0.1:8000/api/posts/', { title, content })
      .then(response => {
        // Add the new post at the top of the posts list
        setPosts([response.data, ...posts]);
        setTitle('');
        setContent('');
      })
      .catch(error => console.error('Error creating post:', error));
  };

  // Handle post deletion
  const handleDeletePost = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/posts/${id}/`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));  // Filter out the deleted post
        alert('Post deleted successfully!');
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  // Handle post edit button click
  const handleEditPost = (post) => {
    setEditingPost(post); // Set the post to be edited
  };

  // Handle updating the post
  const updatePost = (updatedPost) => {
    axios.put(`http://127.0.0.1:8000/api/posts/${updatedPost.id}/`, updatedPost)
      .then(response => {
        const updatedPosts = posts.map((post) =>
          post.id === updatedPost.id ? response.data : post
        );
        setPosts(updatedPosts);  // Update the posts state with the modified post
        setEditingPost(null);  // Clear the editing post state
        alert('Post updated successfully!');
      })
      .catch(error => console.error('Error updating post:', error));
  };

  return (
    <div>
      {/* Post Creation Section */}
      <div className="post-creation">
        <h2>Create a New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>

      {/* Posts List Section */}
      <div className="posts-list">
        <h2>Blog Posts</h2>
        {editingPost ? (
          <EditPostForm post={editingPost} updatePost={updatePost} />
        ) : (
          posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p><small>Created at: {new Date(post.created_at).toLocaleString()}</small></p>
                <button onClick={() => handleEditPost(post)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No posts yet!</p>
          )
        )}
      </div>
    </div>
  );
};

export default Blog;
