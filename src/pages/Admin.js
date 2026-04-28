import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // ✅ AUTH CHECK (INSIDE COMPONENT)
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // ✅ FETCH ORDERS FROM BACKEND
  const fetchOrders = () => {
    fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .then(data => {
        console.log("✅ Orders from backend:", data); // debug
        setOrders(data);
      })
      .catch(err => console.log("❌ Fetch error:", err));
  };

  // ✅ SOCKET + INITIAL LOAD
  useEffect(() => {
    fetchOrders(); // load existing

    const socket = io("http://localhost:5000");

    socket.on("newOrder", (order) => {
      console.log("🔥 New order received:", order);
      setOrders(prev => [order, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ✅ UPDATE STATUS
  const updateStatus = (index, status) => {
    const updated = [...orders];
    updated[index].status = status;
    setOrders(updated);

    const phone = updated[index].phone;

    // WhatsApp notify
    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(
        `Your order is now ${status}`
      )}`,
      "_blank"
    );
  };

  // ✅ MARK DELIVERED (CUSTOM MESSAGE)
  const markDelivered = (order) => {
    const msg = `Hi ${order.name}, your order has been delivered 🎉 Thank you for ordering from Namaste Cafe!`;

    window.open(
      `https://wa.me/91${order.phone}?text=${encodeURIComponent(msg)}`
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🍽 Orders Dashboard</h2>

      {/* EMPTY STATE */}
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o, i) => (
          <div
            key={o.id || i}
            style={{
              border: "1px solid #ddd",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "10px",
              background: "#fff"
            }}
          >
            <h3>{o.name}</h3>
            <p><b>📞</b> {o.phone}</p>
            <p><b>📍</b> {o.address}</p>

            <p><b>Status:</b> {o.status || "Pending"}</p>
            <p><b>Payment:</b> {o.paymentMethod} ({o.paymentStatus})</p>

            <p><b>Items:</b></p>
            {o.items?.map((it, idx) => (
              <p key={idx}>
                {it.name} × {it.qty}
              </p>
            ))}

            <p><b>Total:</b> ₹{o.total}</p>

            {/* ACTION BUTTONS */}
            <div style={{ marginTop: 10 }}>
              <button onClick={() => updateStatus(i, "Accepted")}>
                ✅ Accept
              </button>

              <button
                onClick={() => updateStatus(i, "Preparing")}
                style={{ marginLeft: 10 }}
              >
                👨‍🍳 Preparing
              </button>

              <button
                onClick={() => markDelivered(o)}
                style={{ marginLeft: 10 }}
              >
                🚚 Delivered
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
