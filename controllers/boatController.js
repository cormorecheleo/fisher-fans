const Joi = require('joi');
const Boat = require('../models/Boat'); // Ensure the path is correct

// Joi validation schemas
const boatSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    length: Joi.number().required(),
    yearBuilt: Joi.number().required(),
    // Add more fields as needed
});

const updateBoatSchema = boatSchema.fork(Object.keys(boatSchema.describe().keys), field => field.optional());

const boatController = {

    getAllBoats: async (req, res) => {
        try {
            const boats = await Boat.find({});
            res.json(boats);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    // Create a new boat
    createBoat: async (req, res) => {
        try {
            // const validationResult = boatSchema.validate(req.body);
            // if (validationResult.error) {
            //     return res.status(400).json({ message: validationResult.error.details[0].message });
            // }
            const newBoat = new Boat(req.body);
            const savedBoat = await newBoat.save();
            res.status(201).json(savedBoat);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Update a boat
    updateBoat: async (req, res) => {
        try {
            // const validationResult = updateBoatSchema.validate(req.body);
            // if (validationResult.error) {
            //     return res.status(400).json({ message: validationResult.error.details[0].message });
            // }
            const updatedBoat = await Boat.findByIdAndUpdate(req.params.boatId, req.body, { new: true });
            res.json(updatedBoat);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Delete a boat
    deleteBoat: async (req, res) => {
        try {
            await Boat.findByIdAndDelete(req.params.boatId);
            res.json({ message: 'Boat successfully deleted' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Search for boats
    searchBoats: async (req, res) => {
        try {
            // Build the query based on request parameters
            const query = {}; // Adjust this based on your search criteria and request parameters
            const boats = await Boat.find(query);
            res.json(boats);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    
};

module.exports = boatController;
