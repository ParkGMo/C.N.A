import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Intro from './pages/intro/Intro';
import './scss/global.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Intro />} />
      </Routes>
    </Router>
  );
}

export default App;
