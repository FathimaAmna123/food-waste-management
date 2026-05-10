const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName:{
        type : String,
        required : true,
        trim : true
    },

    quantity: {
        type : String,
        required : true
    },

    category: {
        type : String,
        enum : ['cooked', 'raw', 'packaged', 'fruits', 'vegetables'],
        required : true
    },

    expiryDate: {
        type : Date,
        required : true
    },

    status: {
        type : String,
        enum : ['available', 'donated', 'expired'],
        default : 'available'
    },

    postedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    location: {
        type : String,
        required : true
    },

    description: {
        type : String,
        trim : true
    }
}, { timestamps : true});

module.exports = mongoose.model('Food', foodSchema);