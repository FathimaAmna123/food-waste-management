const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true
    },

    email: {
        type : String,
        required : true,
        unique : true,
        trim : true
    },

    phone: {
        type : String,
        required : true
    },

    userType: {
        type : String,
        enum : ['restaurant', 'household', 'ngo', 'volunteer'],
        require : true
    },

    address: {
        type : String,
        required : true
    }

}, 
{ timestamps : true});

module.exports = mongoose.model('User',userSchema);