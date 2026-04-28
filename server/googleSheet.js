const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const spreadsheetId = "1bMCEaU5zA2Gag0ALnxpljUHXApPPr9P_V1mjR0k-1-Q";

const addOrderToSheet = async (order) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const items = order.items.map(i => `${i.name} x${i.qty}`).join(", ");

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: {
        values: [[
  order.id,
  order.name,
  order.phone,
  order.address,
  items,
  order.total,
  order.status,
  order.paymentMethod, // ✅ NEW
  new Date().toLocaleString()
]]
    }
  });
};
const updateOrderStatusInSheet = async (orderId, newStatus) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  // 1️⃣ Get all rows
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A:I",
  });

  const rows = res.data.values;

  // 2️⃣ Find row index
  const rowIndex = rows.findIndex(row => row[0] === orderId);

  if (rowIndex === -1) {
    console.log("❌ Order not found in sheet");
    return;
  }

  // 3️⃣ Update Status column (G = index 6)
  const updateRange = `Sheet1!G${rowIndex + 1}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: updateRange,
    valueInputOption: "RAW",
    requestBody: {
      values: [[newStatus]]
    }
  });

  console.log("✅ Sheet updated:", orderId, newStatus);
};

module.exports = {
  addOrderToSheet,
  updateOrderStatusInSheet
};