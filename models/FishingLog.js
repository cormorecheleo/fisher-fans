const mongoose = require('mongoose');

const fishingLogSchema = new mongoose.Schema({
    fishName: { type: String, required: true },
    pictureUrl: { type: String, required: true },
    comment: { type: String, required: true },
    length: { type: Number, required: true },
    weight: { type: Number, required: true },
    place: { type: String, required: true },
    date: { type: Date, required: true },
    releaseFish: { type: Boolean, required: true },
    ownerFishingLogId: { type: Number, required: true },
});

const FishingLog = mongoose.model('FishingLog', fishingLogSchema);

module.exports = FishingLog;