const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        date_time: {
            type: String,
            required: true
        },
        location: {
            type: String
        },
        reminder: {
           type: String,
           required: true
        }
    }
);

module.exports = mongoose.model("Tasks", taskSchema);