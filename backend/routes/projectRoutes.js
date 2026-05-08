const express = require("express");

const router = express.Router();

const Project = require("../models/Project");

const authMiddleware = require("../middleware/authMiddleware");


// CREATE PROJECT
router.post("/create", authMiddleware, async (req, res) => {

    try {

        const { name, description } = req.body;

        const newProject = new Project({

            name,
            description,

            createdBy: req.user.id

        });

        await newProject.save();

        res.status(201).json({

            message: "Project created successfully",

            project: newProject

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error"

        });

    }

});

module.exports = router;