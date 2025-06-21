import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAlert("");
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        // Store token
        localStorage.setItem("token", data.token);
        
        // Store user data globally using context
        const userData = {
          id: data.user.id,
          name: data.user.name,
          role: data.user.role,
          email: email
        };
        
        login(userData); // This will update the global state
        
        setAlert("Login successful!");
        navigate('/dashboard');
      }
    } catch (err) {
      setAlert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Login</h2>
      {alert && (
        <div style={{ marginBottom: 12, color: alert === 'Login successful!' ? 'green' : 'red' }}>
          {alert}
        </div>
      )}
      {error && (
        <div style={{ marginBottom: 12, color: 'red' }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>
            Email<br />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Password<br />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: 10, borderRadius: 4, background: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold' }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <span>Don't have an account?</span>
        <br />
        <button
          onClick={handleSignupRedirect}
          style={{
            marginTop: 10,
            padding: '8px 16px',
            borderRadius: 4,
            background: '#28a745',
            color: '#fff',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default Login;
