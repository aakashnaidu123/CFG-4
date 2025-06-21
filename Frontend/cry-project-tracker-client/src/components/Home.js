import React from "react";
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div style={{ fontFamily: "Segoe UI, Arial, sans-serif", background: "#f7fafd", minHeight: "100vh" }}>
        {/* HEADER */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          {/* Logo */}
          <div style={{ fontWeight: 700, fontSize: 28, color: "#1a73e8", letterSpacing: 1 }}>
            CRY Project Tracker
          </div>
          
          {/* User Info and Logout */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 600, color: "#333", fontSize: "16px" }}>
                Welcome, {user.name}!
              </div>
              <div style={{ color: "#666", fontSize: "14px", textTransform: "capitalize" }}>
                Role: {user.role.replace('_', ' ')}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: "#dc3545",
                border: "none",
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 24,
                fontWeight: 500,
                fontSize: 16,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.background = "#c82333"}
              onMouseOut={e => e.currentTarget.style.background = "#dc3545"}
            >
              Logout
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ color: "#1a73e8", fontSize: "32px", marginBottom: "30px" }}>
            Dashboard
          </h1>
          
          {/* User Info Card */}
          <div style={{ 
            background: "#fff", 
            borderRadius: "12px", 
            padding: "24px", 
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
          }}>
            <h2 style={{ color: "#1a73e8", fontSize: "24px", marginBottom: "20px" }}>
              User Information
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div>
                <strong style={{ color: "#666" }}>Name:</strong>
                <div style={{ fontSize: "18px", color: "#333", marginTop: "5px" }}>{user.name}</div>
              </div>
              <div>
                <strong style={{ color: "#666" }}>Email:</strong>
                <div style={{ fontSize: "18px", color: "#333", marginTop: "5px" }}>{user.email}</div>
              </div>
              <div>
                <strong style={{ color: "#666" }}>Role:</strong>
                <div style={{ 
                  fontSize: "18px", 
                  color: "#333", 
                  marginTop: "5px",
                  textTransform: "capitalize"
                }}>
                  {user.role.replace('_', ' ')}
                </div>
              </div>
              <div>
                <strong style={{ color: "#666" }}>User ID:</strong>
                <div style={{ fontSize: "18px", color: "#333", marginTop: "5px" }}>{user.id}</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ 
            background: "#fff", 
            borderRadius: "12px", 
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
          }}>
            <h2 style={{ color: "#1a73e8", fontSize: "24px", marginBottom: "20px" }}>
              Quick Actions
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              <button style={{
                background: "#1a73e8",
                color: "#fff",
                border: "none",
                padding: "16px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}>
                View Projects
              </button>
              <button style={{
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "16px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}>
                Create New Project
              </button>
              <button style={{
                background: "#ffc107",
                color: "#333",
                border: "none",
                padding: "16px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}>
                View Tasks
              </button>
              <button style={{
                background: "#17a2b8",
                color: "#fff",
                border: "none",
                padding: "16px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s"
              }}>
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is not logged in, show landing page
  return (
    <div style={{ fontFamily: "Segoe UI, Arial, sans-serif", background: "#f7fafd", minHeight: "100vh" }}>
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div style={{ fontWeight: 700, fontSize: 28, color: "#1a73e8", letterSpacing: 1 }}>
          CRY Project Tracker
        </div>
        {/* Buttons */}
        <div>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: "none",
              border: "1px solid #1a73e8",
              color: "#1a73e8",
              padding: "8px 18px",
              borderRadius: 24,
              marginRight: 12,
              fontWeight: 500,
              fontSize: 16,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#e3f0fb"}
            onMouseOut={e => e.currentTarget.style.background = "none"}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            style={{
              background: "#1a73e8",
              border: "none",
              color: "#fff",
              padding: "8px 22px",
              borderRadius: 24,
              fontWeight: 500,
              fontSize: 16,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#1765c1"}
            onMouseOut={e => e.currentTarget.style.background = "#1a73e8"}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          background: "linear-gradient(120deg, #e3f0fb 0%, #f7fafd 100%)",
          textAlign: "center",
          padding: "40px 10px 30px 10px",
        }}
      >
        <h1 style={{ fontSize: 38, color: "#1a73e8", marginBottom: 12, fontWeight: 700 }}>
          CRY Project Tracker
        </h1>
        <p style={{ fontSize: 20, color: "#333", maxWidth: 600, margin: "0 auto 30px auto" }}>
          Track and manage projects for Child Rights and You (CRY). Join us in our mission to protect and promote children's rights.
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            background: "#1a73e8",
            color: "#fff",
            border: "none",
            padding: "12px 32px",
            borderRadius: 24,
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(26, 115, 232, 0.1)",
            marginTop: 10,
            transition: "background 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.background = "#1765c1"}
          onMouseOut={e => e.currentTarget.style.background = "#1a73e8"}
        >
          Get Started
        </button>
      </section>

      {/* ABOUT SECTION */}
      <section style={{ padding: "40px 10px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ color: "#1a73e8", fontSize: 28, marginBottom: 10 }}>About CRY</h2>
        <p style={{ fontSize: 17, color: "#444" }}>
          Child Rights and You (CRY) is a non-profit organization dedicated to ensuring children's rights. Our project tracker helps manage and monitor various initiatives across different regions.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#fff", borderTop: "1px solid #e3e3e3", padding: "18px 0", textAlign: "center", marginTop: 40 }}>
        <span style={{ color: "#888", fontSize: 15 }}>
          &copy; 2025 CRY Project Tracker
        </span>
      </footer>
    </div>
  );
};

export default Home;
