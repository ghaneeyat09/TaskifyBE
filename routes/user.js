const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Tasks = require("../models/tasks");
const { generateToken, authorizeUser } = require("../auth/auth");

//register a new user
router.post("/register", (req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then(result => {
        if(result.length >= 1 ){
            res.status(409).json({
                message: "mail exist"
            })
        }
        else{
           bcrypt.hash(req.body.password, 10, (err, hash) => {
               if(err){
                   res.status(500).json({
                       error: err
                   })
               }
               else{
                   const user = new User({
                       userName: req.body.userName,
                       email: req.body.email,
                       password: hash
                   })
                   user.save()
                   .then(result => {
                       console.log(result)
                        res.status(201).json({
                            message: "user created"
                        })
                   })
                   .catch(err => {
                       console.log(err)
                       res.status(401).json({
                           error: err
                       })
                   })
               }
           })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})


//login a user

router.post("/login", (req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then((user) =>{
        if(user.length < 1){
            res.status(404).json({
                message: "user not found"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err){
                res.status(404).json({
                    error: err
                })
            }
           else{
                console.log(user[0]);
                generateToken(user[0], (err, token)=>{
                    if(err){
                        res.status(404).json({
                            error: err
                        })
                    }
                    else{
                        console.log(token);
                        res.status(201).json({
                        user: user[0],
                        message: "Auth successful",
                        token: token
                })
            }
                // res.status(200).json({
                //     message: "success"
                // })
     
    })

}
    })
})
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

//get individual user
router.get("/:id", (req,res,next)=>{
    User.findById({_id: req.params.id})
    .exec()
    .then((result) => {
        res.status(200).json({
            user: result
        })
    })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    })
})

//get each user's tasks
router.get("/:userId/tasks", authorizeUser, (req,res,next)=>{
    Tasks.find({userId: req.params.userId})
    .exec()
    .then(result => {
        if(result.length <= 0){
            res.status(200).json({
                message: "no task yet"
            })
        }else{
        res.status(200).json({
            userTasks: result
        })
    }
    })
    .catch(err => {
        res.status(404).json(
            {
                error: err
            }
        )
    })
})

module.exports = router;