const mongoose = require('mongoose');
const RegistrationSchema=new mongoose.Schema({
    FirstName:String,
    SecondName:String,
    Email:String,
    Password:Number,
    ConfirmPassword:Number,
})
const Registration=new mongoose.model("Registration",RegistrationSchema);
module.exports=Registration;

