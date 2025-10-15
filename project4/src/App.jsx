import React from "react";
import Home from './src/Home'
import About from './components/pages/About'
import Projects from './components/pages/Projects'
import Contact from './components/pages/Contact'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <nav>
        <link to="/">Home</link>
      </nav>

    
      <Routes>
        <Route 
      </Routes>
    </BrowserRouter>
  );
}

export default App;   