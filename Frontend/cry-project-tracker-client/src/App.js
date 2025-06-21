import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard';
import SignupPage from './components/Signup/Signup';
import AssignProjectPage from './components/AssignProjectPage';
import NgoTasks from './components/ngo-tasks';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          {/* Navigation */}
          <div style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <Link to="/">
              <button 
                style={{
                  margin: '0 5px',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '5px',
                  background: '#e1e5e9',
                  color: '#333',
                  cursor: 'pointer'
                }}
              >
                Home
              </button>
            </Link>
            <Link to="/login">
              <button 
                style={{
                  margin: '0 5px',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '5px',
                  background: '#e1e5e9',
                  color: '#333',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
            </Link>
          </div>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assign-project" element={<AssignProjectPage />} />
            <Route path="/ngo-tasks" element={<NgoTasks />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
