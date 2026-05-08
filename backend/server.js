const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Safe Route Loading
try {
    const authRoutes = require("./routes/authRoutes");
    const projectRoutes = require("./routes/projectRoutes");
    const taskRoutes = require("./routes/taskRoutes");

    app.use("/api/auth", authRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/tasks", taskRoutes);
    console.log("✅ All routes loaded successfully");
} catch (err) {
    console.error("❌ ERROR LOADING ROUTES:", err.message);
}

// Home Route
app.get("/", (req, res) => {
    res.json({ message: "Backend Connected Successfully 🚀" });
});

// Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));
