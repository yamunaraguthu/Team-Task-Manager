const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

const projectRoutes = require("./routes/projectRoutes");
const authMiddleware = require("./middleware/authMiddleware");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// AUTH ROUTES
app.use("/api/auth", require("./routes/authRoutes"));


// PROJECT ROUTES
app.use("/api/projects", projectRoutes);


// TASK ROUTES
app.use("/api/tasks", require("./routes/taskRoutes"));


// HOME ROUTE
app.get("/", (req, res) => {
    res.json({
        message: "Backend Connected Successfully 🚀"
    });
});


// PROTECTED ROUTE
app.get("/protected", authMiddleware, (req, res) => {

    res.json({
        message: "Protected Route Accessed",
        user: req.user
    });

});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});