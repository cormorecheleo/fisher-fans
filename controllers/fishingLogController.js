const Joi = require('joi');
const FishingLog = require('../models/FishingLog');

// Joi validation schemas
const fishingLogSchema = Joi.object({
    fishName: Joi.string().required(),
    pictureUrl: Joi.string().required(),
    comment: Joi.string().required(),
    length: Joi.number().required(),
    weight: Joi.number().required(),
    place: Joi.string().required(),
    date: Joi.date().required(),
    releaseFish: Joi.bool().required(),
    ownerFishingLogId: Joi.number().required(),
});

const updateFishingLogSchema = fishingLogSchema.fork(Object.keys(fishingLogSchema.describe().keys), field => field.optional());

const fishingLogController = {
    // Create a new FishingLog
    createFishingLog: async (req, res) => {
        try {
            const validationResult = fishingLogSchema.validate(req.body);
            if (validationResult.error) {
                return res.status(400).json({ message: validationResult.error.details[0].message });
            }
            const newFishingLog = new FishingLog(req.body);
            const savedFishingLog = await newFishingLog.save();
            res.status(201).json(savedFishingLog);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Update a FishingLog
    updateFishingLog: async (req, res) => {
        try {
            const validationResult = updateFishingLogSchema.validate(req.body);
            if (validationResult.error) {
                return res.status(400).json({ message: validationResult.error.details[0].message });
            }
            const updateFishingLogSchema = await FishingLog.findByIdAndUpdate(req.params.fishingLogId, req.body, { new: true });
            res.json(updateFishingLogSchema);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Delete a FishingLog
    deleteFishingLog: async (req, res) => {
        try {
            await FishingLog.findByIdAndDelete(req.params.fishingLogId);
            res.json({ message: 'FishingLog successfully deleted' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Search for FishingLogs
    searchFishingLog: async (req, res) => {
        try {
            // Build the query based on request parameters
            const query = {}; // Adjust this based on your search criteria and request parameters
            const fishingLog = await FishingLog.find(query);
            res.json(fishingLog);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
};

module.exports = fishingLogController;
