const mongoose = require("mongoose");
const studentSchema = new  mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    phone:Number,
    gender:String,
    imagepath:String
})
module.exports = mongoose.model("Studnet",studentSchema);