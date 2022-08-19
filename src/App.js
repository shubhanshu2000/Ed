import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "./components/analytics/Analytics";
import FetchAnalytics from "./components/analytics/FetchAnalytics";
import Navigation from "./components/Navigation";

import Products from "./components/Products/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Products />} />

          <Route path="/analytics" element={<FetchAnalytics />} />
        </Routes>{" "}
      </BrowserRouter>
    </div>
  );
}

export default App;
