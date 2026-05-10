const express = require('express');
const router = express.Router();
const { createDonation, getDonations, getDonationById, updateDonation, deleteDonation } = require('../controllers/donationController');

router.route('/').get(getDonations).post(createDonation);
router.route('/:id').get(getDonationById).put(updateDonation).delete(deleteDonation);

module.exports = router;