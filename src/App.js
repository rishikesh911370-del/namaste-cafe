import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import CheckoutFlow from "./pages/CheckoutFlow";
import DeliveryPage from "./pages/DeliveryPage";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function App() {

  const location = useLocation();
const [token, setToken] = useState(
  localStorage.getItem("adminAuth") === "true"
);  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // ===== ADD TO CART =====
  const addToCart = (item) => {
    const exist = cart.find((i) => i.name === item.name);

    if (exist) {
      setCart(
        cart.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // ===== DECREASE =====
  const decreaseQty = (item) => {
    setCart(
      cart
        .map((i) => {
          if (i.name === item.name) {
            const newQty = i.qty - 1;
            return newQty <= 0 ? null : { ...i, qty: newQty };
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  // ===== UPDATE =====
  const updateQty = (name, type) => {
    setCart(
      cart
        .map((item) => {
          if (item.name === name) {
            const qty = type === "inc" ? item.qty + 1 : item.qty - 1;
            return qty <= 0 ? null : { ...item, qty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // ===== REMOVE =====
  const removeFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  // ✅ ONLY ONE RETURN
  return (
    <>
      {!location.pathname.startsWith("/admin") &&
  location.pathname !== "/cart" && <Navbar cart={cart} />}

      <Routes>

        {/* ===== CUSTOMER ===== */}
        <Route
          path="/"
          element={
            <Menu
              cart={cart}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQty={updateQty}
              removeFromCart={removeFromCart}
            />
          }
        />

      <Route
  path="/checkout"
  element={
<CheckoutFlow 
cart={cart} 
setCart={setCart}
setOrders={setOrders} 
/>
}
/>
<Route path="/deliver/:token" element={<DeliveryPage />} />


        {/* ===== ADMIN ===== */}
       <Route
  path="/admin"
  element={
    token ? (
      <AdminDashboard orders={orders} setOrders={setOrders} />
    ) : (
      <AdminLogin setToken={setToken} />
    )
  }
/>


      </Routes>
  </>
  );
}

export default App;
