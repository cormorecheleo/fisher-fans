const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
    Nom: { type: String, required: true },
    Description: { type: String, required: true },
    Marque: { type: String, required: true },
    AnneeDeFabrication: { type: Number, required: true },
    URLDeLaPhoto: { type: String, required: true },
    TypeDePermisRequis: { type: String, required: true },
    TypeDeBateau: { type: String, required: true },
    Equipements: { type: String, required: true },
    MontantDeLaCaution: { type: Number, required: true },
    CapaciteMaximum: { type: Number, required: true },
    NombreDeCouchages: { type: Number, required: true },
    PortDAttache: { type: String, required: true },
    PaysDAttache: { type: String, required: true },
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    TypeDeMotorisation: { type: String, required: true },
    PuissanceDuMoteur: { type: Number, required: true },
});

const Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;