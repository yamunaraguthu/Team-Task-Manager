const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes with error handling
try {
    const authRoutes = require("./routes/authRoutes");
    const projectRoutes = require("./routes/projectRoutes");
    const taskRoutes = require("./routes/taskRoutes");

    app.use("/api/auth", authRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/tasks", taskRoutes);
    console.log("✅ All routes loaded successfully");
} catch (err) {
    console.error("❌ Route Error:", err.message);
}

// Home Route
app.get("/", (req, res) => {
    res.json({ message: "Backend Connected Successfully 🚀" });
});

// ====================== CRITICAL PORT FIX ======================
const PORT = process.env.PORT || 8080;
console.log(`Using port: ${PORT}`);   // ← Add this line for debug

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
// ============================================================

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));
