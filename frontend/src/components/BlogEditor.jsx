import React, { useState } from 'react';
import axios from 'axios';

import MDEditor from '@uiw/react-md-editor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateBlog = async () => {
    if (!title) {
      setError('Please enter a blog title');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/blogs/generate', { title });
      setContent(res.data.content);
    } catch (err) {
      setError('❌ Failed to generate blog content');
      console.error('Blog generation error:', err?.response?.data || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="blog-editor-container" data-color-mode="light">
      <h2>AI Blog Generator</h2>
      <input
        type="text"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={generateBlog} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && <div className="error-message">{error}</div>}

      <div className="editor-preview" style={{ marginTop: '1rem' }}>
        <MDEditor value={content} onChange={setContent} height={455} />
      </div>

      <div className="preview" style={{ marginTop: '1rem' }}>
        <h3 className="h3">Preview</h3>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
