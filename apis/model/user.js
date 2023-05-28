const mongoose = require("mongoose");
userSchema = new  mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    email:String,
    password:String,
    phone:Number,
    gender:String,
    usertype:String
})
module.exports = mongoose.model("User",userSchema);