const Donation = require('../models/Donation');

const createDonation = async (req, res) => {
    try {
        const donation = await Donation.create(req.body);
        res.status(201).json({ success: true, data: donation });

    }
    catch(error) {
        res.status(400).json({ success: false, message: error.message});
    }
};

const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find()
        .populate('foodItem', 'foodName quantity')
        .populate('donatedBy', 'nameEmail')
        .populate('receivedBy', 'nameEmail');
        res.status(200).json({ success: true, count: donations.length, data: donations });

    }
    catch(error) {
        res.status(500).json({ success: false, message: error.message});
    }
};

const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id)
        .populate('foodItem', 'foodName quantity')
        .populate('donatedBy', 'nameEmail')
        .populate('receivedBy', 'nameEmail');
        if(!donation) {
           return res.status(404).json({ success: false, message: 'Donation not found' }); 
        }
        res.status(200).json({ success: true, data: donation });

    }
    catch(error) {
        res.status(500).json({ success: false, message: error.message});
    }
};

const updateDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!donation) {
           return res.status(404).json({ success: false, message: 'Donation not found' }); 
        }
        res.status(200).json({ success: true, data: donation });

    }
    catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findByIdAndDelete(req.params.id);
        if(!donation) {
           return res.status(404).json({ success: false, message: 'Donation not found' }); 
        }
        res.status(200).json({ success: true, message: 'Donation deleted successfully' });

    }
    catch(error) {
        res.status(500).json({ success: false, message: error.message});
    }
};


module.exports = { createDonation, getDonations, getDonationById, updateDonation, deleteDonation };