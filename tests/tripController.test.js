// tests/tripController.test.js
const request = require('supertest');
const app = require('../server'); // Import your Express application
const mongoose = require('mongoose');
const Trip = require('../models/Trip');

let token;
let testTrip = {
  "title": "Jest Fishing Trip",
  "informationsPratiques": "Bring your fishing gear",
  "typeSortie": "journaliere",
  "typeTarif": "global",
  "datesDebut": "2024-01-01",
  "datesFin": "2024-01-02",
  "heuresDepart": "08:00 AM",
  "heuresFin": "06:00 PM",
  "nombrePassagers": 5,
  "prixSortie": 100,
  "boat": "65a81b451b05bb94dbd1bb61" // Replace with a valid Boat ObjectId
};

describe('Trip Controller Tests', () => {
  let trip;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: "jesttests@doe.com",
        password: "yourpassword"
      });

    token = response.body.token;
  }, 50000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new trip', async () => {
    const response = await request(app)
      .post('/trips')
      .set('Authorization', `Bearer ${token}`)
      .send(testTrip)
      .expect(201);

    trip = response.body;

    expect(response.body.title).toBe('Jest Fishing Trip');
  }, 10000);

  it('should update a trip', async () => {
    const response = await request(app)
      .put(`/trips/${trip._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Fishing Trip',
      })
      .expect(200);
    console.log(response)
    expect(response.title).toBe('Updated Fishing Trip');
  }, 10000);

  it('should delete a trip', async () => {
    const newTrip = await new Trip({
      ...testTrip,
      title: 'ToDelete Fishing Trip'
    }).save();

    await request(app)
      .delete(`/trips/${newTrip._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const deletedTrip = await Trip.findById(newTrip._id);

    expect(deletedTrip).toBeNull();
  }, 10000);

  it('should get all trips', async () => {
    const response = await request(app)
      .get('/trips')
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1); // Assuming at least one trip is created
  }, 10000);

  it('should search for trips', async () => {
    const response = await request(app)
      .get('/trips/search')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1); // Assuming at least one trip is created
  }, 10000);
});
