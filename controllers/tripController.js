const Joi = require('joi');
const Trip = require('../models/Trip');
const Boat = require('../models/Boat');

const tripSchema = Joi.object({
  title: Joi.string().required(), // Titre de la sortie
  informationsPratiques: Joi.string().required(), // Informations pratiques
  typeSortie: Joi.string().valid('journaliere', 'recurrente').required(), // Type de sortie
  typeTarif: Joi.string().valid('global', 'par personne').required(), // Type de tarif
  datesDebut: Joi.date().required(), // Liste des dates de début
  datesFin: Joi.date().required(), // Liste des dates de fin
  heuresDepart: Joi.string().required(), // Liste des heures de départ
  heuresFin: Joi.string().required(), // Liste des heures de fin
  nombrePassagers: Joi.number().required(), // Nombre de passagers
  prixSortie: Joi.number().required(), // Prix de la sortie
  utilisateurOrigine: Joi.string().optional(), // L'utilisateur à l'origine de la sortie
  boat: Joi.string().required(), // Le bateau utilisé pour la sortie
});

const updateTripSchema = tripSchema.fork(
  Object.keys(tripSchema.describe().keys),
  (field) => field.optional()
);

const tripController = {
  /**
   * BF-005 : L'API FF devra permettre de créer une sortie bateau
   * @param {*} req
   * @param {*} res
   * @returns json
   */
  createTrip: async (req, res) => {
    const utilisateurOrigine = req.userId;
    try {
      const validationResult = tripSchema.validate(req.body);
      if (validationResult.error) {
        return res
          .status(400)
          .json({ message: validationResult.error.details[0].message });
      }
      const userBoats = await Boat.find({
        utilisateurOrigine: utilisateurOrigine,
      });
      if (!userBoats) {
        res.status(400).json({ message: err.message });
      }

      const newTrip = new Trip({ ...req.body, utilisateurOrigine });
      const savedTrip = await newTrip.save();
      res.status(201).json(savedTrip);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update a trip
  updateTrip: async (req, res) => {
    const userId = req.userId;
    try {
      const validationResult = updateTripSchema.validate(req.body);
      if (validationResult.erro) {
        return res
          .status(400)
          .json({ message: validationResult.error.details[0].message });
      }
      const updateTrip = await Trip.findByIdAndUpdate(
        req.params.tripId,
        req.body,
        { new: true }
      );
      res.json({ ...updateTrip, utilisateurOrigine: userId });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  /**
   * L’API FF devra permettre de récupérer l'ensemble des sorties pêche
   * @param {*} req
   * @param {*} res
   */
  getAllTrips: async (req, res) => {
    try {
      const trips = await Trip.find();
      res.json(trips);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  /**
   * BF-010 : L’API FF devra permettre de supprimer une sortie pêche
   * @param {*} req
   * @param {*} res
   */
  deleteTrip: async (req, res) => {
    try {
      const tripId = req.params.tripId;
      if (!tripId) {
        return res.status(400).json({ message: 'tripId not valid' });
      }
      const deleteTrip = await Trip.findByIdAndRemove(tripId);
      res.json({ message: 'Trip deleted successfully !' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  /**
   * L'API FF devra permettre de rechercher des sorties bateau en fonction de critères
   * @param {*} req
   * @param {*} res
   */
  searchTrips: async (req, res) => {
    try {
      const keyword = req.query.keyword;
      const minDate = req.query.minDate;
      const maxDate = req.query.maxDate;
      const minPassengers = req.query.minPassengers;
      const maxPassengers = req.query.maxPassengers;

      const searchCriteria = {};

      if (keyword) {
        searchCriteria.$or = [
          { title: { $regex: keyword, $options: 'i' } },
          { informationsPratiques: { $regex: keyword, $options: 'i' } },
        ];
      }

      if (minDate) {
        searchCriteria.datesDebut = { $gte: new Date(minDate) };
      }

      if (maxDate) {
        searchCriteria.datesFin = { $lte: new Date(maxDate) };
      }

      if (minPassengers) {
        searchCriteria.nombrePassagers = { $gte: parseInt(minPassengers) };
      }

      if (maxPassengers) {
        searchCriteria.nombrePassagers = {
          ...searchCriteria.nombrePassagers,
          $lte: parseInt(maxPassengers),
        };
      }

      const matchingTrips = await Trip.find(searchCriteria);
      res.json(matchingTrips);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = tripController;
