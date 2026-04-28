const express = require("express");
const router = express.Router();

// ADMIN CREDENTIALS
const ADMIN = {
  username: "namastecafebhagalpur",
  password: "Namaste@2025#"
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Entered:", username, password);
  console.log("Expected:", ADMIN.username, ADMIN.password);

  if (
    username === ADMIN.username &&
    password === ADMIN.password
  ) {
    console.log("✅ LOGIN SUCCESS");

    return res.json({
      token: "admin-token-123"
    });
  }

  console.log("❌ LOGIN FAILED");

  res.status(401).json({ error: "Invalid login" }); // ✅ FIXED
});

module.exports = router;