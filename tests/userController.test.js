const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Controller Tests', () => {
  let user;
  let token;
  let userCanBeDelete;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: "jesttests@doe.com",
        password: "yourpassword"
      });
    const responseDeleteUser = await request(app)
      .post('/auth/signup')
      .send({
        name: "kopkpk2",
        dateOfBirth: "1990-01-01",
        email: "test555555@example.com",
        phone: "1234567890",
        address: "123 Main St",
        postalCode: "12345",
        city: "City",
        spokenLanguages: ["English", "French"],
        photoURL: "http://example.com/photo.jpg",
        boatLicenseNumber: "12345678",
        insuranceNumber: "123456789012",
        status: "particulier",
        password: "password1232"
      })
    token = response.body.token;
    user = response.body.user;
    userCanBeDelete = responseDeleteUser.body.user;
  }, 50000);
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should retrieve all users', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a single user by id', async () => {
    const response = await request(app)
      .get(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body._id).toBe(user._id.toString());
  });

  it('should update a user', async () => {
    const updates = { name: 'Updated Name' };
    const response = await request(app)
      .patch(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updates)
      .expect(200);

    expect(response.body.name).toBe(updates.name);
  });

  it('should delete a user', async () => {
    console.log('userCanBeDelete._id', userCanBeDelete._id);
    await request(app)
      .delete(`/users/${userCanBeDelete._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const checkUser = await User.findById(userCanBeDelete._id);
    expect(checkUser).toBeNull();
  });
});
