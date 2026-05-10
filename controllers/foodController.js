const Food = require('../models/Food');

const createFood = async (req, res) => {
    try {
        const food = await Food.create(req.body);
        res.status(201).json({ success: true, data: food });

    }
    catch(error) {
        res.status(400).json({ success: false, message: error.message});
    }
};

const getFoods = async (req, res) => {
    try {
        const foods = await Food.find().populate('postedBy', 'name email');
        res.status(200).json({ success: true, count: foods.length, data: foods });

    }
    catch(error) {
        res.status(500).json({ success: false, message: error.message});
    }
};

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id).populate('postedBy', 'name email');;
        if(!food) {
           return res.status(404).json({ success: false, message: 'Food item not found' }); 
        }
        res.status(200).json({ success: true, data: food });

    }
    catch(error) {
        res.status(500).json({ success: false, message: error.message});
    }
};

const updateFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!food) {
           return res.status(404).json({ success: false, message: 'Food item not found' }); 
        }
        res.status(200).json({ success: true, data: food });

    }
    catch(error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if(!food) {
           return res.status(404).json({ success: false, message: 'Food item not found' }); 
        }
        res.status(200).json({ success: true, message: 'Food item deleted successfully' });

    }
    catch(error) {
        res.status(500).json({ success: false, message: error.message});
    }
};


module.exports = { createFood, getFoods, getFoodById, updateFood, deleteFood };