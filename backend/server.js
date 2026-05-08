const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ====================== SAFE ROUTES ======================
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

// ====================== PORT FIX ======================
const PORT = process.env.PORT || 8080;

console.log("Railway PORT:", process.env.PORT);
console.log("Using PORT:", PORT);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is LIVE on port ${PORT}`);
});

// ====================== MONGO ======================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Error:", err.message));

// Prevent crash from unhandled errors
process.on('unhandledRejection', (err) => {
    console.error("❌ Unhandled Rejection:", err);
});

process.on('uncaughtException', (err) => {
    console.error("❌ Uncaught Exception:", err);
});
