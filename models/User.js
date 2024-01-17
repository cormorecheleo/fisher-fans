const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  // NOTE weird bug can't send only accepts name
  // firstName: { type: String, required: true },
  // lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  spokenLanguages: [{ type: String }],
  photoURL: { type: String },
  boatLicenseNumber: { type: String, required: true, unique: true, minlength: 8, maxlength: 8 },
  insuranceNumber: { type: String, required: true, unique: true, minlength: 12, maxlength: 12 },
  status: { type: String, enum: ['particulier', 'professionnel'], required: true },
  companyName: { type: String },
  activityType: { type: String, enum: ['location', 'guide de pêche'] },
  siretNumber: { type: String },
  rcNumber: { type: String },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
