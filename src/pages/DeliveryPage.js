import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DeliveryPage = () => {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .then(data => {
        const found = data.find(o => o.deliveryToken === token);
        setOrder(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const updateStatus = async (status) => {
    if (updating) return;

    setUpdating(true);

    await fetch(`http://localhost:5000/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ riderStatus: status })
    });

    // ✅ update UI without reload
    setOrder(prev => ({ ...prev, riderStatus: status }));
    setUpdating(false);
  };

  // ===== STATES =====
  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (!order) return <h2 style={{ padding: "20px" }}>Order not found ❌</h2>;

  return (
    <div style={{ padding: "20px" }}>

      <h2>🚚 Delivery Page</h2>

      <p><b>Order ID:</b> {order.id}</p>
      <p><b>Name:</b> {order.name}</p>
      <p><b>Phone:</b> {order.phone}</p>
      <p><b>Address:</b> {order.address}</p>

      <p><b>Items:</b></p>
      <ul>
        {order.items?.map((item, i) => (
          <li key={i}>{item.name} × {item.qty}</li>
        ))}
      </ul>

      <p><b>Total:</b> ₹{order.total}</p>

      <p>
        <b>Status:</b>{" "}
        <span style={{
          color:
            order.riderStatus === "Delivered" ? "#2ecc71" :
            order.riderStatus === "Rejected" ? "#e74c3c" :
            "#f1c40f"
        }}>
          {order.riderStatus || "Pending"}
        </span>
      </p>

      {/* ===== BUTTONS ===== */}
      <div style={{ marginTop: "20px" }}>

        <button
          onClick={() => updateStatus("Delivered")}
          disabled={updating || order.riderStatus === "Delivered"}
          style={{
            padding: "12px 22px",
            marginRight: "10px",
            background: "#2ecc71",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transform: updating ? "scale(0.95)" : "scale(1)",
            transition: "0.2s",
            opacity: order.riderStatus === "Delivered" ? 0.6 : 1
          }}
        >
          {order.riderStatus === "Delivered"
            ? "✅ Delivered"
            : "Mark Delivered"}
        </button>

        <button
          onClick={() => updateStatus("Rejected")}
          disabled={updating || order.riderStatus === "Rejected"}
          style={{
            padding: "12px 22px",
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transform: updating ? "scale(0.95)" : "scale(1)",
            transition: "0.2s",
            opacity: order.riderStatus === "Rejected" ? 0.6 : 1
          }}
        >
          {order.riderStatus === "Rejected"
            ? "❌ Rejected"
            : "Mark Rejected"}
        </button>

      </div>

    </div>
  );
};

export default DeliveryPage;