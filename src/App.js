import React from 'react';
import './index.css'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home/home';
import News from './components/news/news';
import Quiz from './components/quiz/quiz';
import Bar from './components/bar/bar'; 

function App() {
  return (
    <Router>
      <Bar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {}
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
