const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
    name: String,
    type: String,
    length: Number,
    yearBuilt: Number,
    // add more fields as needed
});

const Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;
