import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Orders from "./components/orders/Orders";
import Products from "./components/Products/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/orders" element={<Analytics />} /> */}
        </Routes>{" "}
      </BrowserRouter>
    </div>
  );
}

export default App;
