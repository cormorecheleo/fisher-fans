const Boat = require('../models/Boat'); // Ensure the path is correct

const boatController = {
  getAllBoats: async (req, res) => {
    try {
      const boats = await Boat.find({}).populate('createdBy');
      res.json(boats);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // Create a new boat
  createBoat: async (req, res) => {
    try {
      const createdBy = req.userId;
      console.log('createdBy', createdBy);
      const newBoat = new Boat({ ...req.body, createdBy });
      const savedBoat = await newBoat.save();
      res.status(201).json(savedBoat);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // get user boats
  getUserBoats: async (req, res) => {
    const userId = req.userId;
    console.log('userIDboat', userId);
    try {
      // Use the provided user ID to find boats associated with the user
      const userBoats = await Boat.find({ createdBy: userId });
      res.status(200).json(userBoats);
    } catch (error) {
      // Handle errors appropriately
      console.error('Error fetching user boats:', error);
      res.status(400).json({ message: err.message });
    }
  },

  // Update a boat
  updateBoat: async (req, res) => {
    try {
      const userId = req.userId;
      const updatedBoat = await Boat.findByIdAndUpdate(
        req.params.boatId,
        req.body,
        { new: true }
      );
      res.json({...updatedBoat, createdBy: userId});
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
      const { keyword, minYear, maxYear, minPower, maxPower } = req.query;
      const searchCriteria = {};
      if (keyword) {
        searchCriteria.$or = [
          { Nom: { $regex: keyword, $options: 'i' } },
          { Description: { $regex: keyword, $options: 'i' } },
        ];
      }
      if (minYear) {
        searchCriteria.AnneeDeFabrication = { $gte: parseInt(minYear) };
      }
      if (maxYear) {
        searchCriteria.AnneeDeFabrication = {
          ...searchCriteria.AnneeDeFabrication,
          $lte: parseInt(maxYear),
        };
      }
      if (minPower) {
        searchCriteria.PuissanceDuMoteur = { $gte: parseInt(minPower) };
      }
      if (maxPower) {
        searchCriteria.PuissanceDuMoteur = {
          ...searchCriteria.PuissanceDuMoteur,
          $lte: parseInt(maxPower),
        };
      }
      // Build the query based on request parameters
      const boats = await Boat.find(searchCriteria);
      res.json(boats);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  findBoatByGeo: async (req, res) => {
    try {
      const { latitude, longitude } = req.query;

      if (!latitude || !longitude) {
        return res
          .status(400)
          .json({ error: 'Latitude and longitude are required parameters.' });
      }

      const foundBoat = await Boat.findOne({ latitude, longitude });

      if (!foundBoat) {
        return res.status(404).json({ error: 'Boat not found.' });
      }

      res.json(foundBoat);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = boatController;
