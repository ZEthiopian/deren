import React from "react";
import vg from "./assets/derwater.mp4";
import UserScreen from "./pages/UserScreen";
import ProductScreen from "./pages/ProductScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomersScreen from "./pages/CustomersScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <div className="overlay"></div>
        <video src={vg} autoPlay loop muted />
        <div className="content">
          <h1>Der Innovation</h1>
          <Routes>
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/customer" element={<CustomersScreen />} />
            <Route path="/signin" element={<UserScreen />} />
            <Route path="/" element={<ProductScreen />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
