import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {/* Simple navigation for testing */}
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
        <button 
          onClick={() => setCurrentPage('home')}
          style={{
            margin: '0 5px',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '5px',
            background: currentPage === 'home' ? '#667eea' : '#e1e5e9',
            color: currentPage === 'home' ? 'white' : '#333',
            cursor: 'pointer'
          }}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('login')}
          style={{
            margin: '0 5px',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '5px',
            background: currentPage === 'login' ? '#667eea' : '#e1e5e9',
            color: currentPage === 'login' ? 'white' : '#333',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </div>
      
      {renderPage()}
    </div>
  );
}

export default App;
