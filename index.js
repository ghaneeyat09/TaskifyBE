const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors")

const tasksRoute = require("./routes/tasksRoute");
const userRoute = require("./routes/user")

//connection to the db
mongoose.connect(process.env.DB_CONNECTION);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors())
//imported modules
app.use("/tasks", tasksRoute);
app.use("/user", userRoute);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});


app.use((req, res, next) => {
    res.send("yoh! we got the server running.");
})


module.exports = app;