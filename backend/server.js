const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// === PURE TEST - NO ROUTES ===
app.get("/", (req, res) => {
    res.json({ 
        message: "✅ Test Successful! Backend Working on Railway",
        port: process.env.PORT,
        time: new Date().toISOString()
    });
});

console.log("🚀 Test Mode Activated - Routes Disabled");

// PORT
const PORT = process.env.PORT || 8080;
console.log(`Railway gave PORT: ${process.env.PORT}`);
console.log(`Server will run on: ${PORT}`);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server LIVE on port ${PORT}`);
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));
