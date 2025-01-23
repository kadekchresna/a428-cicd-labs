import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './cube.css';

function App() {
  const [isRotating, setIsRotating] = useState(false);
  
  return (
    <div className="scene">
      <div 
        className={`cube ${isRotating ? 'rotate' : ''}`}
        onClick={() => setIsRotating(!isRotating)}
      >
        <div className="cube-face front">Front</div>
        <div className="cube-face back">Back</div>
        <div className="cube-face right">Right</div>
        <div className="cube-face left">Left</div>
        <div className="cube-face top">Top</div>
        <div className="cube-face bottom">Bottom</div>
      </div>
    </div>
    );
  }

export default App;
