import logo from './logo.svg';
import './App.css';
import React from 'react';
import Dashboard from './Components/Dashboard'; // Import the Dashboard component



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>CRY Project Tracker</h1>
        <p>Track and manage projects for a better childhood.</p>
      </header>
      {/* Render the Dashboard component */}
      
      <Dashboard />
    </div>
  );
}

export default App;
