const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                gender: req.body.gender,
                usertype: req.body.usertype
            })
            user.save()
                .then(result => {
                    console.log(result)
                    res.status(200).json({
                        newUser: result
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })

                })
        }
    })
})


router.post("/login", (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: "user not found"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: "password invalid"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        email: user[0].email,
                        phone: user[0].email,
                        gender: user[0].gender,
                        usertype: user[0].usertype
                    },
                        "this is dummy text",
                        {
                            expiresIn: "24h"
                        }
                    )
                    res.status(200).json({
                        username: user[0].username,
                        email: user[0].email,
                        phone: user[0].email,
                        gender: user[0].gender,
                        usertype: user[0].usertype,
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        })
})





module.exports = router