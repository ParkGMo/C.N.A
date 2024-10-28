import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CountryInfo from './pages/countryInfo/CountryInfo';
import Intro from './pages/intro/Intro';
import './scss/global.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Intro />} />
        <Route path="country-info" element={<CountryInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
