import React from 'react';
import Hello from './Hello';
import Counter from './Counter';
import Chat from './Chat';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item"><Link to="/hello">Hello</Link></li>
              <li className="navbar-item"><Link to="/counter">Counter</Link></li>
              <li className="navbar-item"><Link to="/chat">Chat</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/hello" element={<Hello />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
