const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    projectName: {
        type: String
    },

    assignedTo: {
        type: String
    },

    status: {
        type: String,
        default: "Pending"
    },

    deadline: {
        type: String
    }

});

module.exports = mongoose.model("Task", taskSchema);