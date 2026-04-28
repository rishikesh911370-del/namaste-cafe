const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// ✅ IMPORT BOTH FUNCTIONS
const { addOrderToSheet, updateOrderStatusInSheet } = require("../googleSheet");

// 📁 FILE PATH
const filePath = path.join(__dirname, "../orders.json");

// 🔥 LOAD ORDERS
let orders = [];

if (fs.existsSync(filePath)) {
  try {
    orders = JSON.parse(fs.readFileSync(filePath));
  } catch (err) {
    orders = [];
  }
}

// 💾 SAVE FUNCTION
const saveOrders = () => {
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
};

// 🆔 ORDER ID GENERATOR (CLEAN NC001 TYPE)
const generateOrderId = () => {
  if (orders.length === 0) return "NC001";

  const lastOrder = orders[orders.length - 1];
  const lastNumber = parseInt((lastOrder.id || "NC000").replace("NC", ""));
  const newNumber = lastNumber + 1;

  return "NC" + newNumber.toString().padStart(3, "0");
};

// ✅ ADD ORDER (FIXED)
router.post("/", async (req, res) => {
  try {
    const order = {
      id: generateOrderId(), // ✅ FIXED ID
      ...req.body,
      status: "Pending",
      createdAt: new Date(),

       deliveryToken: Math.random().toString(36).substring(2, 10),
riderStatus: "Pending"
    };

    orders.push(order);
    saveOrders();

    // ✅ SEND TO GOOGLE SHEET
    await addOrderToSheet(order);

    // 🔥 SOCKET
    const io = req.app.get("io");
    io.emit("newOrder", order);

    console.log("🔥 ORDER SAVED:", order);

    res.json(order);

  } catch (err) {
    console.log("❌ ORDER ERROR:", err.message);
    res.status(500).json({ message: "Order failed" });
  }
});

// ✅ GET ALL ORDERS
router.get("/", (req, res) => {
  res.json(orders);
});
// ✅ GET ORDER BY DELIVERY TOKEN
router.get("/delivery/:token", (req, res) => {
  const { token } = req.params;

  const order = orders.find(o => o.deliveryToken === token);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

// ✅ GET ALL ORDERS
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, riderStatus } = req.body;

  const order = orders.find(o => o.id.toString() === id.toString());

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (status) order.status = status;
  if (riderStatus) order.riderStatus = riderStatus;

  saveOrders();

  // 🔥 REAL-TIME UPDATE
  const io = req.app.get("io");
  io.emit("orderUpdated", order);

  try {
    await updateOrderStatusInSheet(id, status || riderStatus);
  } catch (err) {}

  res.json(order);
});

module.exports = router;