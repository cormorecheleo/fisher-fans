const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

describe('Auth Controller Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteOne({ email: "test@example.com" });
    await User.deleteOne({ email: "login@example.com" });
  }, 30000);

  beforeEach(async () => {
    // Delete users based on their email addresses used in the tests

  });

  afterAll(async () => {
    await User.deleteOne({ email: "test@example.com" });
    await User.deleteOne({ email: "login@example.com" });
    await mongoose.connection.close();
  });

  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        name: "kopkpk",
        dateOfBirth: "1990-01-01",
        email: "test@example.com",
        phone: "1234567890",
        address: "123 Main St",
        postalCode: "12345",
        city: "City",
        spokenLanguages: ["English", "French"],
        photoURL: "http://example.com/photo.jpg",
        boatLicenseNumber: "12345678",
        insuranceNumber: "123456789012",
        status: "particulier",
        password: "password123"
      })
      .expect(201);
      console.log('response.body should sign up a new user',response.body);

    expect(response.body.token).toBeDefined();
  }, 30000);

  it('should fail to sign up with missing required fields', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: "test@example.com",
        password: "password123"
      })
      .expect(400);

    expect(response.body.message).toContain("validation failed");
  }, 10000);

  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: "johnwd@doe.com",
        password: "yourpassword"
      })
      .expect(200);
    expect(response.body.token).toBeDefined();
  });

});
