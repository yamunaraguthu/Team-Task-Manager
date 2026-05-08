const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();


// ROUTES
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error);
});


// AUTH ROUTES
app.use("/api/auth", authRoutes);


// PROJECT ROUTES
app.use("/api/projects", projectRoutes);


// TASK ROUTES
app.use("/api/tasks", taskRoutes);


// HOME ROUTE
app.get("/", (req, res) => {

    res.json({
        message: "Backend Connected Successfully 🚀"
    });

});


// PORT
const PORT = process.env.PORT || 8080;


// SERVER
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
