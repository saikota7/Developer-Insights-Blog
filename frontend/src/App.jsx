import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import './App.css'; // Add your styles if necessary
import './components/EditPostForm'

function App() {
  // Here we are just handling the basic structure.
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Blog</h1>
      </header>
      <main>
        <Blog />
      </main>
    </div>
  );
}

export default App;
