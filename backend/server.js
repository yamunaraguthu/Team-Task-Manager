const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const projectRoutes = require("./routes/projectRoutes");
const authMiddleware = require("./middleware/authMiddleware");


// MANUAL CORS FIX
app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();

});


// JSON
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


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


// PORT
const PORT = process.env.PORT || 8080;


// SERVER
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
