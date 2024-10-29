import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ExchageRate from './components/exchangeRate/ExchageRate';
import Layout from './components/layout/Layout';
import CountryInfo from './pages/countryInfo/CountryInfo';
import Intro from './pages/intro/Intro';
import './scss/global.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Intro />} />
          <Route path="country-info" element={<CountryInfo />} />
          <Route path="exchange-rate" element={<ExchageRate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
