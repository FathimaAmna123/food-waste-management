const express = require('express');
const router = express.Router();
const { createFood, getFoods, getFoodById, updateFood, deleteFood } = require('../controllers/foodController');

router.route('/').get(getFoods).post(createFood);
router.route('/:id').get(getFoodById).put(updateFood).delete(deleteFood);

module.exports = router;