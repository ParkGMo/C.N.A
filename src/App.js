import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ExchageRate from "./components/exchangeRate/ExchageRate";
import SourcesInfo from "./components/layout/footer/sources-info/SourcesInfo";
import Layout from "./components/layout/Layout";
import PriceIndex1 from "./components/priceIndex/PriceIndex1";
import CountryInfo from "./pages/countryInfo/CountryInfo";
import Intro from "./pages/intro/Intro";
import "./scss/global.scss";
import TodayWeather from "./components/todayWeather/TodayWeather";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Intro />} />
          <Route path="country-info" element={<CountryInfo />} />
          <Route path="exchange-rate" element={<ExchageRate />} />
          <Route path="price-index" element={<PriceIndex1 />} />
          <Route path="sources" element={<SourcesInfo />} />
          <Route path="weather" element={<TodayWeather />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
