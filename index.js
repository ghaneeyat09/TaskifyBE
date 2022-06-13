const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const tasksRoute = require("./routes/tasksRoute");
const userRoute = require("./routes/user")

//connection to the db
mongoose.connect("mongodb+srv://taskify:taskify@cluster0.nz7hbxm.mongodb.net/?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
//imported modules
app.use("/tasks", tasksRoute);
app.use("/user", userRoute);

app.use((req, res, next) => {
    res.send("yoh! we got the server running.");
})


module.exports = app;