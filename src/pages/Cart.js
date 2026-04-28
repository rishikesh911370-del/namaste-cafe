import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutFlow from "./CheckoutFlow";

const Cart = ({ cart, updateQty, removeFromCart }) => {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);

  // ===== CLOSE FUNCTION (SMOOTH) =====
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  // ===== EMPTY CART =====
  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <>
        <div
          className={`cart-overlay ${closing ? "fade-out" : ""}`}
          onClick={handleClose}
        ></div>

        <div className={`cart-drawer ${closing ? "slide-out" : ""}`}>
          <div className="cart-header">
            <h3>Your Cart (0 items)</h3>
            <button onClick={handleClose}>✕</button>
          </div>

          <div style={{ padding: "20px" }}>
            <p>Your cart is empty 😔</p>
          </div>
        </div>
      </>
    );
  }

  // ===== CALCULATIONS =====
const subtotal = cart.reduce(
  (acc, item) => acc + item.price * item.qty,
  0
);

// GST
const gst = Math.round(subtotal * 0.05);

// Total before discount
const totalBeforeDiscount = subtotal + gst;

// Discount logic
let discountPercent = 0;

if (totalBeforeDiscount >= 1299) {
  discountPercent = 12;
} else if (totalBeforeDiscount >= 799) {
  discountPercent = 8;
} else if (totalBeforeDiscount >= 399) {
  discountPercent = 5;
}

const discountAmount = Math.round(
  (totalBeforeDiscount * discountPercent) / 100
);

// Final total
const finalTotal = totalBeforeDiscount - discountAmount;
  return (
    <>
      {/* OVERLAY */}
      <div
        className={`cart-overlay ${closing ? "fade-out" : ""}`}
        onClick={handleClose}
      ></div>

      {/* DRAWER */}
      <div className={`cart-drawer ${closing ? "slide-out" : ""}`}>

        {/* HEADER */}
        <div className="cart-header">
          <h3>🛒 Your Cart ({cart.length} items)</h3>
          <button onClick={handleClose}>✕</button>
        </div>

        {/* DELIVERY TAG */}
        <div className="delivery-tag">
          🚚 Home Delivery Only · Bhagalpur
        </div>

        {/* ITEMS */}
        <div className="cart-items">
          {cart.map((item, i) => (
            <div className="cart-row" key={i}>

              {/* IMAGE */}
              <img src={item.image} alt={item.name} />

              {/* INFO */}
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>₹{item.price} each</p>
                <strong>₹{item.price * item.qty}</strong>

                {/* REMOVE BUTTON */}
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.name)}
                >
                  🗑 Remove
                </button>
              </div>

              {/* QTY */}
              <div className="qty-box">
                <button onClick={() => updateQty(item.name, "dec")}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.name, "inc")}>+</button>
              </div>

            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="cart-footer">

         <div className="bill-row">
  <span>Subtotal</span>
  <span>₹{subtotal}</span>
</div>

<div className="bill-row">
  <span>GST (5%)</span>
  <span>₹{gst}</span>
</div>

<div className="bill-row">
  <span>Total</span>
  <span>₹{totalBeforeDiscount}</span>
</div>

{discountPercent > 0 && (
  <div className="bill-row" style={{ color: "green" }}>
    <span>Discount ({discountPercent}%)</span>
    <span>-₹{discountAmount}</span>
  </div>
)}

<div className="bill-total">
  <span>Total Payable</span>
  <span>₹{finalTotal}</span>
</div>

          {/* CHECKOUT FLOW */}
          <CheckoutFlow
  cart={cart}
  subtotal={subtotal}
  gst={gst}
  discount={discountAmount}
  finalTotal={finalTotal}
/>

        </div>

      </div>
    </>
  );
};

export default Cart;
