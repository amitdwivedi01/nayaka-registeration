const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name:String,
    Gmail:String,
    Number:String,
    city:String,
    Photo:String,
    docFront:String,
    docBack:String,
    ticket:String,
    visa:String,
    middleName:String,
    lastName:String,
    address:String,
    landmark:String,
    pincode:String,
    state:String,
    pan:String,
    passport:String,
});

const user = mongoose.model("user", userSchema);

module.exports = user;