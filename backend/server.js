const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

const projectRoutes = require("./routes/projectRoutes");
const authMiddleware = require("./middleware/authMiddleware");

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Project Routes
app.use("/api/projects", projectRoutes);

// Task Routes
app.use("/api/tasks", require("./routes/taskRoutes"));

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Backend Connected Successfully 🚀"
    });
});

// Protected Route
app.get("/protected", authMiddleware, (req, res) => {

    res.json({
        message: "Protected Route Accessed",
        user: req.user
    });

});

// Railway Port Fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
