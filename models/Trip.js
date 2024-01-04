const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    tripName:String,
    boat:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Boat'
    },

});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;