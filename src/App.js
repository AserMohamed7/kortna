import React from 'react';
import './index.css'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home/home';
import News from './components/news/news';
import Quiz from './components/quiz/quiz';
import Bar from './components/bar/bar'; 
import Egyptian from './components/leagues/egyptian/egyptian';
import Premier from './components/leagues/premier/premier';
import Liga from './components/leagues/liga/liga';

function App() {
  return (
    <Router>
      <Bar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {}
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leagues/egyptian" element={<Egyptian/>} />
        <Route path="/leagues/premier" element={<Premier/>} />
        <Route path="/leagues/liga" element={<Liga/>} />
      </Routes>
    </Router>
  );
}

export default App;
