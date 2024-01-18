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
  ownerFishingLogId: Joi.string().required(),
});

const updateFishingLogSchema = fishingLogSchema.fork(
  Object.keys(fishingLogSchema.describe().keys),
  (field) => field.optional()
);

const fishingLogController = {
  // Create a new FishingLog
  createFishingLog: async (req, res) => {
    try {
      const validationResult = fishingLogSchema.validate(req.body);
      if (validationResult.error) {
        return res
          .status(400)
          .json({ message: validationResult.error.details[0].message });
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
        return res
          .status(400)
          .json({ message: validationResult.error.details[0].message });
      }
      const updatedFishingLog = await FishingLog.findByIdAndUpdate(
        req.params.fishingLogId,
        req.body,
        { new: true }
      );
      res.json(updatedFishingLog);
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
  
  // Get all FishingLogs
  getAllFishingLogs: async (req, res) => {
    try {
      const fishingLogs = await FishingLog.find();
      res.json(fishingLogs);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Search for FishingLogs
  searchFishingLog: async (req, res) => {
    try {
      // Build the query based on request parameters
      const query = {};

      if (req.query.fishName) {
        query.fishName = { $regex: new RegExp(req.query.fishName, 'i') };
      }

      if (req.query.place) {
        query.place = { $regex: new RegExp(req.query.place, 'i') };
      }

      if (req.query.startDate && req.query.endDate) {
        query.date = {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate),
        };
      }

      // Add more conditions as needed based on your model fields

      const fishingLogs = await FishingLog.find(query);
      res.json(fishingLogs);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = fishingLogController;
