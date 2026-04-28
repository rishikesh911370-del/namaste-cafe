import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [orderEnabled, setOrderEnabled] = useState(true);
  const [orders, setOrders] = useState([]);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // 🕒 DELIVERY TIME (GLOBAL)
  const getDeliveryTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);

    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

useEffect(() => {
  const isAuth = localStorage.getItem("adminAuth");

  if (!isAuth) {
    navigate("/admin-login");
  }
}, [navigate]);

useEffect(() => {
  fetch("http://localhost:5000/order-status")
    .then(res => res.json())
    .then(data => setOrderEnabled(data.enabled));
}, []);

const toggleOrders = async () => {
  const res = await fetch("http://localhost:5000/toggle-orders", {
    method: "POST",
  });

  const data = await res.json();
  setOrderEnabled(data.enabled);
};

  // ✅ FETCH ORDERS
 useEffect(() => {
  fetch("http://localhost:5000/orders")
    .then(res => res.json())
    .then(data => {
      setOrders(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    })
    .catch(err => console.error(err));
}, []);

  // 🔥 SOCKET (REALTIME + SOUND CONTROL)
  useEffect(() => {
  const socket = io("http://localhost:5000");

  // 🆕 NEW ORDER
  socket.on("newOrder", (newOrder) => {
    setOrders(prev => {
      const updatedOrders = [newOrder, ...prev];

      const hasPending = updatedOrders.some(o => o.status === "Pending");

      if (!audioRef.current) {
        audioRef.current = new Audio("/sound.mp3");
        audioRef.current.loop = true;
      }

      if (hasPending) {
        audioRef.current.play().catch(() => {});
      }

      return updatedOrders;
    });
  });

  // 🔥 ADD THIS BLOCK (THIS IS YOUR FIX)
  socket.on("orderUpdated", (updatedOrder) => {
    setOrders(prev => {
      const updated = prev.map(order =>
        order.id === updatedOrder.id ? updatedOrder : order
      );

      // 🔊 SOUND CONTROL AGAIN
      const hasPending = updated.some(o => o.status === "Pending");

      if (audioRef.current) {
        if (hasPending) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }

      return updated;
    });
  });

  return () => socket.disconnect();
}, []);


  // ✅ UPDATE STATUS (BACKEND + WHATSAPP + SOUND)
  const updateStatus = async (index, status) => {
    const order = orders[index];

    try {
      const res = await fetch(`http://localhost:5000/orders/${order.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      if (!res.ok) throw new Error("Failed");

      const updatedOrder = await res.json();

      // ✅ UPDATE UI
      const updated = [...orders];
      updated[index] = updatedOrder;
      setOrders(updated);

      // 🔊 SOUND CONTROL (QUEUE BASED)
      const hasPending = updated.some(o => o.status === "Pending");

      if (audioRef.current) {
        if (hasPending) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }

      // 📲 WHATSAPP MESSAGE
      let message = "";

      if (status === "Accepted") {
        message = `Hi ${order.name}, your order is being prepared .\n\nIt will reach you by *${getDeliveryTime()}*.\n\nThank you for ordering from Namaste Cafe`;
      }

      if (status === "Ready") {
        message = `Hi ${order.name}, your order is out for delivery.\n\nIt will reach you shortly.\n\nThanks for your patience`;
      }

      if (status === "Delivered") {
        message = `Hi ${order.name}, your order has been delivered.\n\nWe hope you enjoyed your meal \n\nThank you for choosing Namaste Cafe`;
      }

      if (status === "Rejected") {
        message = `Hi ${order.name}, unfortunately your order could not be processed.\n\nSorry for the inconvenience\n\n-Namaste Cafe`;
      }

      // 📞 FORMAT PHONE (INDIA)
      const phone = `91${order.phone.replace(/^0+/, "")}`;

      if (message) {
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
      }

    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  return (
    <div className="dashboard">
      <h1>📦 Orders Dashboard</h1>

<button
  onClick={toggleOrders}
  style={{
    position: "absolute",
    top: "20px",
    right: "120px",
    background: orderEnabled ? "#ff4d4f" : "#2ecc71",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  {orderEnabled ? "Disable Orders ❌" : "Enable Orders ✅"}
</button>

 <button
  style={{
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  }}
  onClick={() => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/admin";
  }}
>
  Logout
</button>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={order.id}>

            <h3>🧾 Order ID: {order.id}</h3>

            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>

            <div className="items">
              <strong>Items:</strong>
              {order.items.map((item, i) => (
                <div key={i}>
                  {item.name} × {item.qty}
                </div>
              ))}
            </div>

            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <div style={{
  marginTop: "12px",
  display: "flex",
  alignItems: "center",
  gap: "10px"
}}>

  {/* 🔗 LINK BOX */}
  <div style={{
    flex: 1,
    background: "#1f2a3a",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#ccc",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    border: "1px solid rgba(255,255,255,0.1)"
  }}>
    {order.deliveryToken
      ? `.../deliver/${order.deliveryToken}`
      : "No link"}
  </div>

  {/* 📋 COPY BUTTON */}
  <button
    onClick={() => {
      if (order.deliveryToken) {
        navigator.clipboard.writeText(
          `http://localhost:3000/deliver/${order.deliveryToken}`
        );
        alert("Link copied!");
      }
    }}
    style={{
      padding: "8px 14px",
      background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500"
    }}
  >
    Copy 🔗

 </button>
</div>


<p>
  Rider Status:{" "}
  <span style={{
    color:
      order.riderStatus === "Delivered" ? "#2ecc71" :
      order.riderStatus === "Rejected" ? "#e74c3c" :
      "#f1c40f"
  }}>
    {order.riderStatus || "Pending"}
  </span>
</p>

            <div className="actions">

              {/* 🟡 PENDING */}
              {(order.status === "Pending" || !order.status) && (
                <>
                  <button
                    className="btn accept"
                    onClick={() => updateStatus(index, "Accepted")}
                  >
                    Accept
                  </button>

                  <button
                    className="btn reject"
                    onClick={() => updateStatus(index, "Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}

              {/* 🟢 ACCEPTED */}
              {order.status === "Accepted" && (
                <>
                  <button
                    className="btn success"
                    onClick={() => updateStatus(index, "Ready")}
                  >
                    Ready
                  </button>

                  <button
                    className="btn reject"
                    onClick={() => updateStatus(index, "Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}

              {/* 🔵 READY */}
              {order.status === "Ready" && (
                <>
                  <button
                    className="btn success"
                    onClick={() => updateStatus(index, "Delivered")}
                  >
                    Delivered
                  </button>

                  <button
                    className="btn reject"
                    onClick={() => updateStatus(index, "Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;