import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate,} from 'react-router-dom';
import AuthForm from './components/AuthForm.jsx';
import BlogEditor from './components/BlogEditor.jsx';
import BlogList from './components/BlogList.jsx';
import Navbar from './components/Navbar.jsx';
import axios from 'axios';

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 Add loading state

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false); // 👈 done checking localStorage
  }, []);

  const handleLogin = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  // 👇 Don't render anything until we check localStorage
  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/blogs" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              !token ? <AuthForm mode="login" onLogin={handleLogin} /> : <Navigate to="/blogs" />
            }
          />
          <Route
            path="/signup"
            element={
              !token ? <AuthForm mode="signup" onLogin={handleLogin} /> : <Navigate to="/blogs" />
            }
          />
          <Route
            path="/blogs"
            element={token ? <BlogList /> : <Navigate to="/login" />}
          />
          <Route
            path="/editor"
            element={token ? <BlogEditor /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
