import React, { useState } from "react";
import QRCode from "qrcode";
import { useEffect } from "react";

const CheckoutFlow = ({ cart, setOrders, setCart }) => {

  const [orderEnabled, setOrderEnabled] = useState(true);
  const handlePlaceOrder = () => {
  const order = {
    id: Date.now(),
    items: cart,
    status: "Pending",
  };

  // ✅ SAFE CHECK
  if (typeof setOrders === "function") {
    setOrders(prev => [...prev, order]);
  } else {
    console.error("❌ setOrders is not passed from parent");
  }

  const message = `Order Details:\n${cart
    .map(item => `${item.name} x ${item.qty}`)
    .join("\n")}`;

  window.open(
    `https://wa.me/918002733701?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  setTimeout(() => {
    if (typeof setCart === "function") {
      setCart([]);
    }
  }, 500);
};


console.log("setOrders:", setOrders);
console.log("setCart:", setCart);


const isCafeOpen = () => {
  const now = new Date();
  const hours = now.getHours(); // 0–23 format

  return hours >= 11 && hours < 22; // 11 AM to 10 PM
};
const isOpen = isCafeOpen();

  const [step, setStep] = useState(null);
  const [distance, setDistance] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [showPaidButton, setShowPaidButton] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: ""
  });

const generateQR = () => {
const amount = total;
const upiLink = `upi://pay?pa=7643969555m1@pnb&pn=NamasteCafe&am=${amount}&cu=INR`;
QRCode.toDataURL(upiLink).then(setQrCode);
};
const handleUPIPay = () => {
const amount = total; 
const upiLink = `upi://pay?pa=7643969555m1@pnb&pn=NamasteCafe&am=${amount}&cu=INR`;  

 if (/Android|iPhone/i.test(navigator.userAgent)) {
    window.location.href = upiLink;

    // when user returns → show button
    setShowPaidButton(true);
  } else {
    alert("UPI works only on mobile.");
  }
};
useEffect(() => {
  if (step === "upiQR") {
    generateQR();
  }
}, [step]);
useEffect(() => {
  const handleFocus = () => {
    setShowPaidButton(true);
  };

  window.addEventListener("focus", handleFocus);

  return () => {
    window.removeEventListener("focus", handleFocus);
  };
}, []);

useEffect(() => {
  fetch("http://localhost:5000/order-status")
    .then(res => res.json())
    .then(data => setOrderEnabled(data.enabled));
}, []);



  const [paymentMethod, setPaymentMethod] = useState("");

  // ===== VALIDATION =====
  const isValid =
    form.name.trim() &&
    form.phone.length === 10 &&
    form.address.trim();


  // ===== CALCULATIONS =====

  const COD_CHARGE = 10;

// subtotal
const subtotal = cart.reduce(
  (acc, item) => acc + item.price * item.qty,
  0
);

// GST
const gst = Math.round(subtotal * 0.05);

// total before discount
const totalBeforeDiscount = subtotal + gst;

// discount logic
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

// COD
const codFee = paymentMethod === "cod" ? COD_CHARGE : 0;

// FINAL TOTAL
const total = totalBeforeDiscount - discountAmount + codFee;


  // ===== GOOGLE API =====
  const getRouteDistance = async (lat, lng) => {
    const cafeLat = 25.2425;
    const cafeLng = 86.9842;

    const res = await fetch(
      `http://localhost:5000/route?origin=${lat},${lng}&destination=${cafeLat},${cafeLng}`
    );

    return await res.json();
  };

  // ===== CHECK DELIVERY =====
  const handleCheckDelivery = () => {
    setStep("loading");
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setCoords({ lat, lng });

      try {
        const route = await getRouteDistance(lat, lng);

        setDistance(route.distance);
        const numericDistance = parseFloat(route.distance);

        setTimeout(() => {
          setLoading(false);

          if (numericDistance <= 4) {
            setStep("success");
          } else {
            alert("Sorry, currently we are not serving your area ❌");
            setStep(null);
          }
        }, 1200);

      } catch (err) {
        alert("Error fetching route ❌");
        setStep(null);
        setLoading(false);
      }
    });
  };

  // ===== COMMON MESSAGE BUILDER =====
  const buildMessage = (paymentText, orderId) => {
    let message = `*Namaste Cafe, Bhagalpur*\n\n`;

    message += `*Order ID: ${orderId}*\n`;
    message += `Name: ${form.name}\n`;
    message += `Phone: ${form.phone}\n`;
    message += `Address: ${form.address}\n`;

    if (coords) {
      message += `Location: https://maps.google.com/?q=${coords.lat},${coords.lng}\n`;
    }

    message += `\nItems Ordered:\n`;

    cart.forEach(item => {
      message += `* ${item.name} × ${item.qty} — ₹${item.price * item.qty}\n`;
    });

    message += `\nSubtotal: ₹${subtotal}`;
message += `\nGST (5%): ₹${gst}`;
message += `\nTotal: ₹${totalBeforeDiscount}`;

if (discountAmount > 0) {
  message += `\nDiscount (${discountPercent}%): -₹${discountAmount}`;
}

if (paymentMethod === "cod") {
  message += `\nCOD Charges: ₹10`;
}

message += `\n*Total Payable: ₹${total}*`;

    message += `\n\n*Payment: ${paymentText}*`;

    return message;
  };

const sendOrderToServer = async (paymentStatus) => {
  const orderData = {
    name: form.name,
    phone: form.phone,
    address: form.address,
    items: cart,

    subtotal,
    gst,
    discount: discountAmount,
    total,

    paymentMethod,
    paymentStatus,
    status: "Pending",
    time: new Date()
  };

  try {
    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (!res.ok) throw new Error("Server error");

    const savedOrder = await res.json();

    // ✅ WhatsApp message WITH DISCOUNT
    const message = buildMessage(paymentMethod, savedOrder.id);

    window.open(`https://wa.me/918002733701?text=${encodeURIComponent(message)}`);
    setStep("successOrder");

    if (typeof setOrders === "function") {
      setOrders(prev => [...prev, savedOrder]);
    }

    if (typeof setCart === "function") {
      setCart([]);
    }

  } catch (err) {
    console.error("❌ ERROR:", err);
    alert("Order failed");
  }
};


 // ✅ COD HANDLER
const handleCOD = async () => {
  setPaymentMethod("cod");

  await sendOrderToServer("Pending");

  const message = buildMessage("COD");
  window.open(`https://wa.me/918002733701?text=${encodeURIComponent(message)}`);
};


// ✅ UPI PAID HANDLER
const handleUPIPaid = async () => {
  setPaymentMethod("upi"); // ✅ ADD THIS

  await sendOrderToServer("Paid");

  const message = buildMessage("UPI Paid");
  window.open(`https://wa.me/918002733701?text=${encodeURIComponent(message)}`);
};

  
  const MIN_ORDER = 249;

  const isOrderValid = subtotal >= MIN_ORDER;
  const canPlaceOrder = isOrderValid && isOpen;

  return (
    <>
      {!isOrderValid && (
        <p style={{
          color: "#ff6b3d",
          fontSize: "14px",
          textAlign: "center"
        }}>
          Add ₹{MIN_ORDER - subtotal} more to place order
        </p>
      )}

{!isOpen && (
  <p style={{
    color: "#ff4d4f",
    textAlign: "center",
    fontSize: "14px"
  }}>
    ⛔ We're offline, but not forever ! 
    <br />
    🕒 Find us "11:00 AM – 10:00 PM"
  </p>
)}

{!orderEnabled && (
  <p style={{ color: "red", textAlign: "center" }}>
    🚫 Orders are currently closed. Please try later.
  </p>
)}
      <button
        className="checkout-btn"
         disabled={!canPlaceOrder || !orderEnabled}
        onClick={() => setStep("delivery")}
      >
        {isOrderValid
          ? "Proceed to Order"
          : `Add ₹${Math.max(MIN_ORDER - subtotal, 0)} more`}
      </button>
    
      {/* ===== DELIVERY ===== */}
      {step === "delivery" && (
        <div className="modal">
          <div className="modal-box fade-in">
            <span className="close" onClick={() => setStep(null)}>✕</span>

            <h2>📍 Check Delivery Area</h2>

            <p>
              We deliver within <strong>4 km</strong> radius from our cafe. Please check if your location is serviceable.
            </p>

            <button className="primary-btn" onClick={handleCheckDelivery}>
              📍 Check Location
            </button>
          </div>
        </div>
      )}

      {/* ===== LOADING ===== */}
      {step === "loading" && (
        <div className="modal">
          <div className="modal-box fade-in">
            <h3>Checking...</h3>
            <div className="loader-big"></div>
          </div>
        </div>
      )}

      {/* ===== SUCCESS ===== */}
      {step === "success" && (
        <div className="modal">
          <div className="modal-box fade-in">
            <span className="close" onClick={() => setStep(null)}>✕</span>

            <h2>🎉 Yay! We are serving your area.</h2>

            <button
              className="primary-btn"
              onClick={() => setStep("form")}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

{/* ===== NOT SERVICEABLE ===== */}
{step === "not-serviceable" && (
  <div className="modal">
    <div className="modal-box fade-in">

      <span className="close" onClick={() => setStep(null)}>✖</span>

      <h2>❌ Not Serviceable</h2>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Sorry, we currently deliver within <strong>4 km</strong> only.
      </p>

      <p style={{ textAlign: "center", fontSize: "13px", color: "#888" }}>
        Try a closer location or contact us.
      </p>

      <button
        className="primary-btn"
        onClick={() => setStep("delivery")}
      >
        Try Again
      </button>

    </div>
  </div>
)}


      {/* ===== FORM ===== */}
      {step === "form" && (
        <div className="modal">
          <div className="modal-box fade-in">

            <span className="close" onClick={() => setStep(null)}>✕</span>

            <h2>Your Details</h2>

            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

           <input
  placeholder="Phone Number"
  value={form.phone}
  maxLength={10}
  onChange={(e) => {
    const value = e.target.value;

    // allow only numbers
    if (!/^\d*$/.test(value)) return;

    setForm({ ...form, phone: value });
  }}
/>
{form.phone && form.phone.length !== 10 && (
  <p style={{ color: "red", fontSize: "12px" }}>
    Phone no. must be 10 digits
  </p>
)}


            <textarea
              placeholder="Full Address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            {/* PAYMENT */}
            <div className="payment-options">
              <p>Select Payment Method</p>

              <div className="payment-btns">
                <button
                  className={paymentMethod === "cod" ? "active" : ""}
                  onClick={() => setPaymentMethod("cod")}
                >
                  Cash on Delivery
                </button>

                <button
                  className={paymentMethod === "upi" ? "active" : ""}
                 onClick={() => {
  setPaymentMethod("upi");
  setStep("upiOptions");
}}
                >
                  Pay via UPI
                </button>
              </div>
<p style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
  ⚠️ Cash on Delivery includes ₹10 extra charge
</p>

            </div>

            <textarea
  placeholder="Special Instructions (optional)"
  value={form.note}
  onChange={(e) =>
    setForm({ ...form, note: e.target.value })
  }
  className="note-box"
/>


           <button
  className="primary-btn"
  disabled={!isValid || !paymentMethod}
  onClick={() => {
    if (paymentMethod === "cod") {
      handleCOD();
    } else if (paymentMethod === "upi") {
      setStep("upiOptions");
    }
  }}
>
  Place Order
</button>


          </div>
        </div>
      )}

      {/* ===== UPI OPTIONS ===== */}
{step === "upiOptions" && (
  <div className="modal">
    <div className="modal-box">

      <span className="close" onClick={() => setStep(null)}>×</span>

      <h2>Choose Payment Method</h2>

      <div className="payment-options">
  <button className="primary-btn full-btn"
onClick={() => setStep("upiQR")}
>
     Scan QR Code
  </button>

  <button className="secondary-btn full-btn"
  onClick={handleUPIPay}
>
 Pay via UPI
  </button>
{/* 👇 SHOW AFTER RETURN */}
  {showPaidButton && (
    <>
      <p style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
        After payment, click below
      </p>

      <button
        className="primary-btn full-btn"
        onClick={handleUPIPaid}
        style={{ marginTop: "10px" }}
      >
        I Have Paid →
      </button>
    </>
  )}

</div>


    </div>
  </div>
)}
{/* ===== UPI QR ===== */}
{step === "upiQR" && (
  <div className="modal">
    <div className="modal-box">

      <span className="close" onClick={() => setStep(null)}>×</span>


      <h2>Scan & Pay</h2>

<img src={qrCode} alt="QR Code" className="qr-img" />

      <p>Scan using GPay / PhonePe / Paytm</p>

      <button
        className="primary-btn"
        onClick={handleUPIPaid}
      >
        I Have Paid →
      </button>

    </div>
  </div>
)}

{step === "successOrder" && (
  <div className="modal">
    <div className="modal-box fade-in" style={{ textAlign: "center" }}>

      <h2 style={{ color: "#2ecc71" }}>🎉 Order Placed Successfully!</h2>

      <p style={{ marginTop: "10px" }}>
        Your order has been received.
        <br />
        We’ll start preparing it shortly 👨‍🍳
      </p>

      <button
        className="primary-btn"
        style={{ marginTop: "20px" }}
        onClick={() => {
          setStep(null);
          window.location.href = "/";
        }}
      >
        Back to Menu
      </button>

    </div>
  </div>
)}
    </>
  );
};

export default CheckoutFlow;