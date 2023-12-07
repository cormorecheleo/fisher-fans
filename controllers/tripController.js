const Joi = require('joi');
const Trip = require('../models/Trip');
const Boat = require('../models/Boat');

const tripSchema = Joi.object({
    tripName: Joi.string().required(),
    boatId: Joi.string().required()
});

const updateTripSchema = tripSchema.fork(Object.keys(tripSchema.describe().keys), field => field.optional());

const tripController = {

    // Create a trip
    createTrip: async (req,res) => {
        try {
            const { tripName, boatId } = req.body;
            const validationResult = tripSchema.validate(req.body);
            if(validationResult.error){
                return res.status(400).json({message: validationResult.error.details[0].message})
            }
            const boat = await Boat.findById(boatId);

            const newTrip = new Trip({tripName: tripName, boat: boat});
            const savedTrip = await newTrip.save();
            res.status(201).json(savedTrip);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    // Update a trip
    updateTrip: async (req,res) => {
        try {
            const validationResult = updateTripSchema.validate(req.body);
            if(validationResult.erro){
                return res.status(400).json({message: validationResult.error.details[0].message});
            }
            const updateTrip = await Trip.findByIdAndUpdate(req.body.boatId, req.body.trip, { new:true });
            res.json(updateTrip);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

}

module.exports = tripController;