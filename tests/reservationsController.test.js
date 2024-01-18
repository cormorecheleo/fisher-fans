const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');

let token;
let testReservation = {
  DateRetenue: new Date(),
  NombreDePlacesReservees: 5,
  PrixTotal: 100,
  trip: "655f6eb7b6e7c1002a4e1f4d", 
};

describe('Reservation Controller Tests', () => {
  let reservation;
  
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

  beforeEach(async () => {
  });

  afterAll(async () => {
    await Reservation.deleteOne({ DateRetenue: testReservation.DateRetenue });
    await mongoose.connection.close();
  });

  it('should create a new reservation', async () => {
    const response = await request(app)
      .post('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .send({...testReservation})
      .expect(201);

    reservation = response.body;
    expect(response.body.DateRetenue).toBeDefined();
  }, 10000);

  it('should get all reservations', async () => {
    const response = await request(app)
      .get('/reservations')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(1);
  }, 10000);

  it('should get a reservation by ID', async () => {
    const response = await request(app)
      .get(`/reservations/${reservation._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.DateRetenue).toEqual(reservation.DateRetenue);
  }, 10000);

  it('should update a reservation', async () => {
    const response = await request(app)
      .put(`/reservations/${reservation._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        PrixTotal: 120.0,
      })
      .expect(200);

    expect(response.body.PrixTotal).toBe(120.0);
  }, 10000);

  it('should delete a reservation', async () => {
    await request(app)
      .delete(`/reservations/${reservation._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const deletedReservation = await Reservation.findById(reservation._id);
    expect(deletedReservation).toBeNull();
  }, 10000);
});