import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

const CheckoutFlow = ({ cart, setOrders, setCart }) => {

  // ===== STATE =====
  const [step, setStep] = useState(null);
  const [coords, setCoords] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [showPaidButton, setShowPaidButton] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderEnabled, setOrderEnabled] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: ""
  });

  // ===== BUSINESS LOGIC =====

  const isCafeOpen = () => {
    const h = new Date().getHours();
    return h >= 11 && h < 22;
  };

  const isOpen = isCafeOpen();

  const COD_CHARGE = 10;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const gst = Math.round(subtotal * 0.05);
  const totalBeforeDiscount = subtotal + gst;

  let discountPercent = 0;
  if (totalBeforeDiscount >= 1299) discountPercent = 12;
  else if (totalBeforeDiscount >= 799) discountPercent = 8;
  else if (totalBeforeDiscount >= 399) discountPercent = 5;

  const discountAmount = Math.round(
    (totalBeforeDiscount * discountPercent) / 100
  );

  const codFee = paymentMethod === "cod" ? COD_CHARGE : 0;
  const total = totalBeforeDiscount - discountAmount + codFee;

  const MIN_ORDER = 249;
  const isOrderValid = subtotal >= MIN_ORDER;
  const canPlaceOrder = isOrderValid && isOpen && orderEnabled;

  const isValid =
    form.name.trim() &&
    form.phone.length === 10 &&
    form.address.trim();

  // ===== FETCH ORDER STATUS =====
  useEffect(() => {
    fetch("https://your-backend-url.vercel.app/order-status")
      .then(res => res.json())
      .then(data => setOrderEnabled(data.enabled))
      .catch(() => setOrderEnabled(true));
  }, []);

  // ===== DELIVERY CHECK =====
  const handleCheckDelivery = () => {
    setStep("loading");
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setCoords({ lat, lng });

      try {
        const res = await fetch(
          `https://your-backend-url.vercel.app/route?origin=${lat},${lng}&destination=25.2425,86.9842`
        );

        const data = await res.json();
        const dist = parseFloat(data.distance);

        setTimeout(() => {
          setLoading(false);
          if (dist <= 4) setStep("success");
          else setStep("not-serviceable");
        }, 1000);

      } catch {
        alert("Error checking location ❌");
        setStep(null);
      }
    });
  };

  // ===== MESSAGE BUILDER =====
  const buildMessage = (orderId) => {
    let msg = `*Namaste Cafe, Bhagalpur*\n\n`;
    msg += `*Order ID: ${orderId}*\n`;
    msg += `Name: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\n`;

    if (coords) {
      msg += `Location: https://maps.google.com/?q=${coords.lat},${coords.lng}\n`;
    }

    msg += `\nItems:\n`;
    cart.forEach(i => {
      msg += `• ${i.name} x ${i.qty} = ₹${i.price * i.qty}\n`;
    });

    msg += `\nSubtotal: ₹${subtotal}`;
    msg += `\nGST: ₹${gst}`;
    msg += `\nDiscount: -₹${discountAmount}`;
    if (paymentMethod === "cod") msg += `\nCOD: ₹10`;

    msg += `\n*Total: ₹${total}*`;
    msg += `\nPayment: ${paymentMethod.toUpperCase()}`;

    return msg;
  };

  // ===== SEND ORDER =====
  const sendOrder = async (paymentStatus) => {
    const orderData = {
      ...form,
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
      const res = await fetch("https://your-backend-url.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      const saved = await res.json();

      const message = buildMessage(saved.id);
      window.open(
        `https://wa.me/918002733701?text=${encodeURIComponent(message)}`
      );

      setOrders?.(prev => [...prev, saved]);
      setCart?.([]);
      setStep("successOrder");

    } catch {
      alert("Order failed ❌");
    }
  };

  // ===== PAYMENT HANDLERS =====
  const handleCOD = async () => {
    setPaymentMethod("cod");
    await sendOrder("Pending");
  };

  const handleUPIPaid = async () => {
    setPaymentMethod("upi");
    await sendOrder("Paid");
  };

  const handleUPIPay = () => {
    const link = `upi://pay?pa=7643969555m1@pnb&pn=NamasteCafe&am=${total}&cu=INR`;
    window.location.href = link;
    setShowPaidButton(true);
  };

  const generateQR = () => {
    const link = `upi://pay?pa=7643969555m1@pnb&pn=NamasteCafe&am=${total}&cu=INR`;
    QRCode.toDataURL(link).then(setQrCode);
  };

  useEffect(() => {
    if (step === "upiQR") generateQR();
  }, [step, generateQR]);

  useEffect(() => {
    const onFocus = () => setShowPaidButton(true);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // ===== UI =====
  return (
    <>
      {!canPlaceOrder && (
        <p style={{ textAlign: "center", color: "red" }}>
          { !isOpen ? "Cafe Closed 🕒" :
            !orderEnabled ? "Orders Disabled 🚫" :
            `Add ₹${MIN_ORDER - subtotal} more`
          }
        </p>
      )}

      <button
        className="checkout-btn"
        disabled={!canPlaceOrder}
        onClick={() => setStep("delivery")}
      >
        Proceed to Order
      </button>

      {step === "delivery" && (
        <Modal title="Check Delivery">
          <button onClick={handleCheckDelivery}>Check Location</button>
        </Modal>
      )}

      {step === "loading" && <Modal title="Checking..." />}

      {step === "success" && (
        <Modal title="Service Available 🎉">
          <button onClick={() => setStep("form")}>Continue</button>
        </Modal>
      )}

      {step === "not-serviceable" && (
        <Modal title="Not Deliverable ❌">
          <button onClick={() => setStep("delivery")}>Retry</button>
        </Modal>
      )}

      {step === "form" && (
        <Modal title="Your Details">
          <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Phone" maxLength={10}
            onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g,"") })}
          />
          <textarea placeholder="Address"
            onChange={e => setForm({ ...form, address: e.target.value })}
          />

          <button onClick={handleCOD} disabled={!isValid}>COD</button>
          <button onClick={() => setStep("upiOptions")} disabled={!isValid}>UPI</button>
        </Modal>
      )}

      {step === "upiOptions" && (
        <Modal title="UPI Payment">
          <button onClick={() => setStep("upiQR")}>Scan QR</button>
          <button onClick={handleUPIPay}>Pay via UPI</button>

          {showPaidButton && (
            <button onClick={handleUPIPaid}>I Have Paid</button>
          )}
        </Modal>
      )}

      {step === "upiQR" && (
        <Modal title="Scan QR">
          <img src={qrCode} alt="QR" />
          <button onClick={handleUPIPaid}>I Have Paid</button>
        </Modal>
      )}

      {step === "successOrder" && (
        <Modal title="Order Placed 🎉">
          <button onClick={() => window.location.href = "/"}>
            Back to Menu
          </button>
        </Modal>
      )}
    </>
  );
};

// SIMPLE MODAL
const Modal = ({ title, children }) => (
  <div className="modal">
    <div className="modal-box">
      <h2>{title}</h2>
      {children}
    </div>
  </div>
);

export default CheckoutFlow;