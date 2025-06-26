import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container">
        
        <Link to="/" className="logo">
          <img src="logo_GB.png" alt="GenBlog logo" width="80" height="80" />
          <h1>GeniBlog</h1>
        </Link>
        <div className="nav-name">
          {user ? (
            <>
              <span className="name">Hello, {user.username}</span>
              <Link to="/blogs" className="nav-link">
                Your Blogs
              </Link>
              <Link to="/editor" className="nav-link">
                New Blog
              </Link>
              <button onClick={onLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}