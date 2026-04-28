import React, { useState } from "react";

const Checkout = ({ cart }) => {
  const [showModal, setShowModal] = useState(false);

  // CALCULATIONS
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const MIN_ORDER = 249;
  const isValid = subtotal >= MIN_ORDER;

  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  return (
    <>
      {/* ===== MAIN PAGE ===== */}
      <div className={`checkout-container ${showModal ? "blur-bg" : ""}`}>

        {/* HERO IMAGE */}
        {cart.length > 0 && (
          <img
            src={cart[0].image}
            alt="food"
            className="checkout-hero"
          />
        )}

        {/* ================= ORDER SUMMARY ================= */}
        <div className="checkout-card">
          <h3 className="checkout-title">Order Summary</h3>

          {cart.map((item, i) => (
            <div className="checkout-item" key={i}>
              
              <div>
                <strong>{item.name}</strong>
                <p style={{ fontSize: "12px", margin: 0 }}>
                  ₹{item.price} x {item.qty}
                </p>
              </div>

              <div>
                ₹{item.price * item.qty}
              </div>

            </div>
          ))}

        </div> {/* ✅ CLOSE ORDER SUMMARY */}

        {/* ================= BILL DETAILS ================= */}
        <div className="checkout-card">
          <h3 className="checkout-title">Bill Details</h3>

          <div className="bill-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="bill-row">
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>

          <div className="bill-total">
            <span>Total Payable</span>
            <span>₹{total}</span>
          </div>

          {/* WARNING */}
          {!isValid && (
            <p
              style={{
                color: "#ff6b3d",
                fontSize: "14px",
                margin: "8px 0",
                textAlign: "center",
              }}
            >
              Add ₹{MIN_ORDER - subtotal} more to place order
            </p>
          )}

          {/* BUTTON */}
          <button
            className="checkout-btn"
            onClick={() => isValid && setShowModal(true)}
            disabled={!isValid}
          >
            {isValid
              ? "🚚 Check Delivery Availability"
              : `Add ₹${MIN_ORDER - subtotal} more`}
          </button>

        </div> {/* ✅ CLOSE BILL DETAILS */}

        {/* ================= MODAL ================= */}
        {showModal && (
          <div className="modal-overlay">
            <div className="delivery-modal">

              {/* HEADER */}
              <div className="modal-header">
                <h3>Check Delivery Area</h3>
                <button onClick={() => setShowModal(false)}>✕</button>
              </div>

              {/* CONTENT */}
              <div className="modal-content">
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                  📍
                </div>

                <h2>Do We Deliver to You?</h2>

                <p>
                  We deliver within <b>4 km</b> of our cafe on Dixon Road,
                  Bhagalpur.
                </p>

                <p style={{ fontSize: "13px", color: "#777" }}>
                  Tap below to check your address instantly using GPS.
                </p>

                <button className="location-btn">
                  📍 Use My Current Location
                </button>
              </div>

            </div>
          </div>
        )}

      </div> {/* ✅ CLOSE MAIN CONTAINER */}
    </>
  );
};

export default Checkout;
