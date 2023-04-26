const mongoose = require("mongoose");

const useSchema = new mongoose.Schema({
    name :{
        type: String,
        require: [ true , "Name is required"],
        trim : true,
        maxlength : [25,"Name must be 25 Char Long"]
    },
    email: {
        type:String,
        unique: true,
        require : [true, "Email is required"]
    }
});

module.exports = mongoose.model("user",useSchema);