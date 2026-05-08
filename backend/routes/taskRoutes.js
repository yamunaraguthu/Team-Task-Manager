const express = require("express");

const router = express.Router();

const Task = require("../models/Task");


// CREATE TASK
router.post("/create", async (req, res) => {

    try {

        const {
            title,
            projectName,
            assignedTo,
            deadline
        } = req.body;

        const newTask = new Task({
            title,
            projectName,
            assignedTo,
            deadline
        });

        await newTask.save();

        res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// GET ALL TASKS
router.get("/", async (req, res) => {

    try {

        const tasks = await Task.find();

        res.status(200).json(tasks);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// UPDATE TASK STATUS
router.put("/update/:id", async (req, res) => {

    try {

        const { status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// DELETE TASK
router.delete("/delete/:id", async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;