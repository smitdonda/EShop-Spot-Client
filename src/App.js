import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Cart from "./components/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllSmartPhones from "./components/SmartPhone/SmartPhones";
import SmartTv from "./components/SmartTv/SmartTv";
import TrueWirelessStereoBuds from "./components/TWS/TrueWirelessStereoBuds";
import SmartWatches from "./components/SmartWatches/SmartWatches";
import Accessories from "./components/SmartMobileAccessories/Accessories";
import ProductsBrand from "./components/ProductsBrand"
import Signup from "./components/Signup";
import Login from "./components/Login";


export const EshopSpotContext = React.createContext();

function App() {
  let [cart, setCart] = useState([]);
  let [cartValue, setCartValue] = useState(cart.length);
  let [cartTotalPrice, setCartTotalPrice] = useState();

  return (
    <div>
      <BrowserRouter>
        <EshopSpotContext.Provider
          value={{
            cart,
            setCart,
            cartValue,
            setCartValue,
            cartTotalPrice,
            setCartTotalPrice,
          }}
        >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/smartmobile/:id" element={<AllSmartPhones />} />
            <Route path="/smarttv/:id" element={<SmartTv />} />
            <Route
              path="/truewirelessstereobuds/:id"
              element={<TrueWirelessStereoBuds />}
            />
            <Route path="/smartwatches/:id" element={<SmartWatches />} />
            <Route path="/accessories/:id" element={<Accessories />} />
            <Route path="/products/:id" element={<ProductsBrand />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </EshopSpotContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
