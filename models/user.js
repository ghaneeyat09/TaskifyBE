const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            // match:  /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
        },
        password: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("User", userSchema)