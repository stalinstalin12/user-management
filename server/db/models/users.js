const mongoose=require('mongoose');

const user=new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    // age : {
    //     type : Number,
    //     required : false,
    // },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    image : {
        type : String,
    }
});
module.exports = mongoose.model("users", user);
