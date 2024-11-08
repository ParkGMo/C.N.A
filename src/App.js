import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CountryTime from "./components/countryTime/CountryTime";
import ExchageRate from "./components/exchangeRate/ExchageRate";
import SourcesInfo from "./components/layout/footer/sources-info/SourcesInfo";
import Layout from "./components/layout/Layout";
import PriceIndex1 from "./components/priceIndex/PriceIndex1";
import TodayWeather from "./components/todayWeather/TodayWeather";
import CountryInfo from "./pages/country-info/CountryInfo";
import Intro from "./pages/intro/Intro";
import OverseasTouristInfo from "./pages/overseas-tourist-info/OverseasTouristInfo";
import RepresentativeDestination from "./pages/representative-destination/RepresentativeDestination";
import "./scss/global.scss";
import WorldPriceIndex from "./components/priceIndex/WorldPriceIndex";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Intro />} />
          <Route path="country-info" element={<CountryInfo />} />
          <Route path="exchange-rate" element={<ExchageRate />} />
          <Route path="price-index" element={<WorldPriceIndex />} />
          <Route path="sources" element={<SourcesInfo />} />
          <Route path="weather" element={<TodayWeather />} />
          <Route path="country-time" element={<CountryTime />} />
          <Route path="overseas-tourist" element={<OverseasTouristInfo />} />
          <Route
            path="representative-destination"
            element={<RepresentativeDestination />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
