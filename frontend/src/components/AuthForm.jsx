import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useAuth }  from '../context/AuthContext'

export default function AuthForm({ mode, onLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //const { handleLogin } = useAuth(); // ✅ context instead of props

  const isSignup = mode === 'signup';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = isSignup
        ? { username, email, password }
        : { email, password };

      const route = isSignup ? '/api/auth/signup' : '/api/auth/login';

      const res = await axios.post(route, payload);
      onLogin(res.data.token, res.data.user); // ✅ context call
      navigate('/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to authenticate');
    }
  };

  return (
    <div className="auth-container">
      
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
         <h1 className="welcome">{isSignup ? 'WELCOME TO GeniBlog' : 'WELCOME TO GeniBlog'}</h1>
         <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
    </div>
  );
}
