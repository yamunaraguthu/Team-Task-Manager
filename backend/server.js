const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");


// ================= CORS FIX =================
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

    // IMPORTANT
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();

});


// ================= JSON =================
app.use(express.json());


// ================= MONGODB =================
mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected");

})
.catch((err) => {

    console.log(err);

});


// ================= ROUTES =================
app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);


// ================= HOME =================
app.get("/", (req, res) => {

    res.json({
        message: "Backend Connected Successfully 🚀"
    });

});


// ================= PROTECTED =================
app.get(
    "/protected",
    authMiddleware,
    (req, res) => {

        res.json({
            message: "Protected Route Accessed",
            user: req.user
        });

    }
);


// ================= 404 HANDLER =================
app.use((req, res) => {

    res.status(404).json({
        message: "Route Not Found"
    });

});


// ================= PORT =================
const PORT = process.env.PORT || 8080;


// ================= SERVER =================
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
