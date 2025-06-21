import React, { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'cry_frontliner',
    ngo_name: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear ngo_name if role is not ngo_partner
    if (name === "role" && value !== "ngo_partner") {
      setForm(prev => ({ ...prev, ngo_name: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert('');
    setError('');

    // Client side validation (optional, server also checks)
    if (!form.name || !form.email || !form.password || !form.role) {
      setError('Name, Email, Password, and Role are required.');
      setLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    if (form.role === "ngo_partner" && !form.ngo_name) {
      setError('NGO Name is required for NGO Partner role.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setAlert("Registration successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#e8f0fe 0%,#fceabb 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{
        maxWidth: 420,
        margin: "60px auto 0 auto",
        padding: 32,
        border: "1px solid #ddd",
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 4px 24px 0 rgba(32,124,229,0.10)",
      }}>
        <h2 style={{ textAlign: "center", color: "#007bff", marginBottom: 24, letterSpacing: 1 }}>
          Sign Up for About Functionality
        </h2>
        {alert && (
          <div style={{ marginBottom: 12, color: 'green', textAlign: "center" }}>{alert}</div>
        )}
        {error && (
          <div style={{ marginBottom: 12, color: 'red', textAlign: "center" }}>{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label>
              Name<br />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>
              Email<br />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>
              Password<br />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>
              Role<br />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
              >
                <option value="cry_frontliner">Cry Frontliner</option>
                <option value="ngo_partner">NGO Partner</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
          {form.role === "ngo_partner" && (
            <div style={{ marginBottom: 16 }}>
              <label>
                NGO Name<br />
                <input
                  type="text"
                  name="ngo_name"
                  value={form.ngo_name}
                  onChange={handleChange}
                  required={form.role === "ngo_partner"}
                  style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
                />
              </label>
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              background: "linear-gradient(90deg,#007bff 0%,#00c6ff 100%)",
              color: '#fff',
              border: 'none',
              fontWeight: 'bold',
              fontSize: 18,
              letterSpacing: 1,
              boxShadow: "0 2px 4px rgba(0,123,255,0.10)",
              cursor: loading ? "not-allowed" : "pointer"
            }}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          Already have an account? <a href="/login" style={{ color: "#007bff" }}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;