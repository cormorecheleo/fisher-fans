const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Titre de la sortie
    informationsPratiques: { type: String, required: true }, // Informations pratiques
    typeSortie: { type: String, enum: ['journaliere', 'recurrente'], required: true }, // Type de sortie
    typeTarif: { type: String, enum: ['global', 'par personne'], required: true }, // Type de tarif
    datesDebut: { type: Date, required: true }, // Liste des dates de début
    datesFin: { type: Date, required: true }, // Liste des dates de fin
    heuresDepart: { type: String, required: true }, // Liste des heures de départ
    heuresFin: { type: String, required: true }, // Liste des heures de fin
    nombrePassagers: { type: Number, required: true }, // Nombre de passagers
    prixSortie: { type: Number, required: true }, // Prix de la sortie
    utilisateurOrigine: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // L'utilisateur à l'origine de la sortie
    boat: { type: mongoose.Schema.Types.ObjectId, ref: 'Boat', required: true }, // Le bateau utilisé pour la sortie
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
