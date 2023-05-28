const express = require ("express")
const app =express()
const studentRoute = require ("./apis/routers/student");
const facultyRoute = require ("./apis/routers/faculty");
const userRoute = require ("./apis/routers/user");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload")
const bodyparser = require("body-parser");
mongoose.connect("mongodb+srv://usman:poiuy098@first.axntgnz.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection.on("error",err =>{
    console.log("connection failed")
});
mongoose.connection.on("connected",connected =>{
    console.log("connected with database.....")
});
app.use(fileupload({
    useTempFiles : true
}))
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use("/student",studentRoute);
app.use("/faculty",facultyRoute);
app.use("/user",userRoute);
// handle bad url invalid url
app.use((req,res,next)=>{
    res.status(404).json({
        error : "invalid resquest"
    });
});
module.exports = app