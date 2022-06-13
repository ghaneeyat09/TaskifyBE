const express = require("express");
const router = express.Router();
const Tasks = require("../models/tasks");
const { generateToken, authorizeUser } = require("../auth/auth");

//get all tasks
router.get("/", (req,res,next) => {
    Tasks.find()
    .select("title date_time location reminder _id")
    .exec()
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            message: "all tasks fetched",
            tasks: result
        })
    })
    .catch(err => console.log("error: " + err))
})

//post a new task
router.post("/", authorizeUser, (req, res, next) => {
    const task = new Tasks(
        {
            userId: req.body.userId,
            title: req.body.title,
            date_time: req.body.date_time,
            location: req.body.location,
            reminder: req.body.reminder
        }
    )
    .save()
    .then((result) => {
        // console.log(result);
        res.status(201).json({
            message: "new task posted"
        })
    })
    .catch(err => console.log("error: " + err ))
})

//get tasks by id
router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Tasks.findById({_id: id})
    .exec()
    .then((result) => {
        // console.log(result);
        if(!result){
           res.status(404).json({
               message: "task not found"
           })
        }
        res.status(200).json({
            message: "order with ID " + id + "has been fetched",
            task: result
        })
    })
    .catch(err => console.log("error: " + err))
})

//edit date and time
router.patch("/:id", authorizeUser, (req, res, next) => {
    const id = req.params.id;
    const editedTask = {
        date_time: req.body.date_time
    }
    Tasks.findByIdAndUpdate({_id: id}, {$set: editedTask})
    .exec()
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            message: "date and time for task ID " + id + "has been updated"
        })
    })
    .catch(err => console.log("error: " + err))
})

//delete task
router.delete("/:id", authorizeUser, (req, res, next) => {
    const id = req.params.id;

    Tasks.findByIdAndRemove({_id: id})
    .exec()
    .then((result) => {
        // console.log(result);
        res.status(200).json({
            message: "task has been deleted"
        }
        )
    })
    .catch(err => console.log("error: " + err))
})

module.exports = router;