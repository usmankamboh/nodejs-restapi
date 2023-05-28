const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser");
const Student = require("../model/student");
const mongoose = require("mongoose");
const check_auth = require("../middleware/check_auth")
const cloudinary = require("cloudinary").v2
// Configuration 
cloudinary.config({
    cloud_name: "xxxxxx",
    api_key: "xxxxxxxxxxxxx",
    api_secret: "xxxxxxxxxxxxxxxxxxx"
});
router.get("/", check_auth, (req, res, next) => {
    Student.find()
        .then(result => {
            res.status(200).json({
                studentData: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
router.get("/:id", (req, res, next) => {
    console.log(req.params.id)
    Student.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                studentData: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
router.post("/", bodyParser.urlencoded(), (req, res, next) => {
    console.log(req.body)
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result)
        const student = new Student({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            imagepath: result.url
        })
        student.save()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    newStudent: result
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })

            })
    })

})

// for delete data request 
router.delete("/:id", (req, res, next) => {
    console.log(req.params.id)
    Student.deleteMany({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "data deleted",
                studentData: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
// for update there is two method to update data patch and put 
// patch is used for specific row or entity of data 
// put is used to update data by using all given data 
router.put("/:id", (req, res, next) => {
    console.log(req.params.id)
    Student.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            imagepath: req.body.imagepath
        }
    })
        .then(result => {
            res.status(200).json({
                updatedData: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
module.exports = router