const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    foodItem: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Food',
        require : true
    },

    donatedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },

    receivedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },

    status: {
        type : String,
        enum : ['pending', 'completed', 'cancelled'],
        default : 'pending'
    },

    donationDate: {
        type : Date,
        default : Date.now
    },

    notes: {
        type : String,
        trim : true
    }

}, { timestamps : true});

module.exports = mongoose.model('Donation', donationSchema);