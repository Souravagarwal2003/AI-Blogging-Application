import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError('Failed to fetch blogs');
      }
    } finally {
      setLoading(false); // ✅ Ensure loading stops
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchBlogs();
    } else {
      setError('You are not logged in.');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="error">Loading blogs...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!blogs.length) return <div className="error">No blogs found. Create one <a href="/editor">here</a>.</div>;

  return (
    <div className="blog-list">
      <h2>Your Blogs</h2>
      {blogs.map((blog) => (
        <article key={blog._id} className="blog-article">
          <h3 className="h3">{blog.title}</h3>
          <div className="p1">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown></div>
          <hr />
        </article>
      ))}
    </div>
  );
}
