const mongoose = require('mongoose');

const UserData = mongoose.Schema({
    Profile_Image: {
        type: String,
        required: true,
    },
    Name : {
        type: String,
        required: true,

    },
    FatherName: {
        type: String,
        required: true,
    },
    Email : {
        type: String,
        required: true,
        unique: true,
    },
    Password : {
        type: String,
        required: true,
    }
})

const User_Schema = mongoose.model("UserSchema", UserData)

module.exports = {User_Schema}