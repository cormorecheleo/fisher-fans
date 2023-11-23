const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    length: { type: Number, required: true },
    yearBuilt: { type: Number, required: true },
    // add more fields as needed, marking them as required if necessary
});

const Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;