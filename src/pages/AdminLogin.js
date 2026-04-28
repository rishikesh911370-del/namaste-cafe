import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setToken }) => {
  const navigate = useNavigate();

  // ✅ EMPTY BY DEFAULT (FIXED)
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);

        localStorage.setItem("adminAuth", "true"); // ✅ keep login

        navigate("/admin");
      } else {
        setError(data.error || "Invalid login ❌");
      }

    } catch (err) {
      setError("Server not running ❌");
    }

    setLoading(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-box">

        <h2>Namaste Cafe</h2>
        <p className="admin-sub">Admin Panel Login</p>

        {error && <div className="error-box">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          autoComplete="off"   // ✅ prevent browser autofill
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          autoComplete="off"
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login →"}
        </button>

      </div>
    </div>
  );
};

export default AdminLogin;