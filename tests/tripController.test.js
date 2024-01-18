// tests/tripController.test.js
const request = require('supertest');
const app = require('../server'); // Import your Express application
const mongoose = require('mongoose');
const Trip = require('../models/Trip');

let token;
let testUser;
let trip;
let testTrip = {
  title: "JestFishingTrip",
  informationsPratiques: "Bring your fishing gear",
  typeSortie: "journaliere",
  typeTarif: "global",
  datesDebut: "2024-01-20T08:00:00.000Z",
  datesFin: "2024-01-20T16:00:00.000Z",
  utilisateurOrigine: "65a81b451b05bb94dbd1bb61",
  heuresDepart: "06:00",
  heuresFin: "16:00",
  nombrePassagers: 5,
  prixSortie: 100,
  boat: "65a81dd32a58209d66f6213d"
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
    testUser = response.body.user;
    trip = Trip.create({
      title: "JestFishingTrip",
      informationsPratiques: "Bring your fishing gear",
      typeSortie: "journaliere",
      typeTarif: "global",
      datesDebut: "2024-01-20T08:00:00.000Z",
      datesFin: "2024-01-20T16:00:00.000Z",
      utilisateurOrigine: "65a81b451b05bb94dbd1bb61",
      heuresDepart: "06:00",
      heuresFin: "16:00",
      nombrePassagers: 5,
      prixSortie: 100,
      boat: "65a81dd32a58209d66f6213d"
    })
  }, 50000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new trip', async () => {
    let response;
    try {
      response = await request(app)
        .post('/trips')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: "JestFishingTrip",
          informationsPratiques: "Bring your fishing gear",
          typeSortie: "journaliere",
          typeTarif: "global",
          datesDebut: "2024-01-20T08:00:00.000Z",
          datesFin: "2024-01-20T16:00:00.000Z",
          utilisateurOrigine: "65a81b451b05bb94dbd1bb61",
          heuresDepart: "06:00",
          heuresFin: "16:00",
          nombrePassagers: 5,
          prixSortie: 100,
          boat: "65a81dd32a58209d66f6213d"
        })
        .expect(201);
    } catch (error) {
      if (error.response) {
        console.error("La requête a échoué avec la réponse: ", error.response.body);
      } else {
        console.error("Une erreur s'est produite : ", error.message);
      }
      throw error;
    }
    console.log('should create a new trip response.body', response.body)
    trip = response.body;

    expect(response.body.title).toBe('JestFishingTrip');
  }, 10000);


  it('should update a trip', async () => {
    const response = await request(app)
      .put(`/trips/${trip._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Fishing Trip',
      })
      .expect(200);
    expect(response.body._doc.title).toBe('Updated Fishing Trip');
  }, 10000);

  it('should delete a trip', async () => {
    const newTrip = await new Trip({
      ...testTrip,
      title: 'ToDelete Fishing Trip'
    }).save();
    console.log('should delete a trip newTrip', newTrip)

    await request(app)
      .delete(`/trips/${newTrip._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const deletedTrip = await Trip.findById(newTrip._id);

    expect(deletedTrip).toBeNull();
  }, 10000);

  it('should search for trips', async () => {
    const response = await request(app)
      .get('/trips/search')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
  }, 10000);
});