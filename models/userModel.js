const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
   
    email: {
        type: String,
        required: true,
        unique: true
    },
   
    phone: {
        type: String,
        require: false,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLen: [8, "Password length should not be less than 8"],
        maxLen: [15, "Password length should not be greater than 15"]
    },
    admin:{
        type: Boolean,
        default:false
    }
     
   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)