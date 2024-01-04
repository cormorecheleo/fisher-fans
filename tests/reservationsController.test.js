const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

let authToken;
let reservationId;
let user;
let testObject = {
  Description: 'Luxury yacht with modern amenities',
  Marque: 'YachtMaker',
  AnneeDeFabrication: 2020,
  URLDeLaPhoto: 'http://example.com/photo.jpg',
  TypeDePermisRequis: 'Yacht',
  TypeDeBateau: 'Yacht',
  Equipements: 'GPS, Radar, Life Jackets',
  MontantDeLaCaution: 5000,
  CapaciteMaximum: 10,
  NombreDeCouchages: 5,
  PortDAttache: 'Marina Bay',
  PaysDAttache: 'France',
  Latitude: 43.2951,
  Longitude: 5.3631,
  TypeDeMotorisation: 'Inboard',
  PuissanceDuMoteur: 350,
};
describe('Reservation Controller Tests', () => {
  beforeAll(async () => {
    // Connect to the MongoDB database before running the tests
    await mongoose.connect(process.env.MONGODB_URI);
    await request(app).post('/signup').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    const response = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    authToken = response.body.token;
    user = response.body.user;
    console.log("USER", user)
    testObject = { ...testObject, createdBy: response.body.user._id };
  }, 50000);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Reservation Routes', () => {
    let boatId;

    beforeAll(async () => {
      // Create a test boat before running the reservation tests
      const boatResponse = await request(app)
        .post('/boats')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          Nom: 'Test Boat',
          ...testObject,
        });

      boatId = boatResponse.body._id;
    });

    it('should create a reservation', async () => {
      const response = await request(app)
        .post('/reservations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          DateRetenue: '2024-01-15',
          NombreDePlacesReservees: 5,
          PrixTotal: 150.75,
          userId: user._id, // Replace with the actual user ID
          boatId,
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('DateRetenue', '2024-01-15T00:00:00.000Z');
      reservationId = response.body._id; // Store the reservation ID for subsequent tests
    });

    it('should get a reservation by ID', async () => {
      const response = await request(app)
        .get(`/reservations/${reservationId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id', reservationId);
      // Include other expected properties in the response body
    });

    it('should update a reservation', async () => {
      const response = await request(app)
        .put(`/reservations/${reservationId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          DateRetenue: '2024-01-16',
          NombreDePlacesReservees: 3,
          PrixTotal: 100.5,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('DateRetenue', '2024-01-16T00:00:00.000Z');
      // Include other expected properties in the response body
    });

    it('should delete a reservation', async () => {
      const response = await request(app)
        .delete(`/reservations/${reservationId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty(
        'message',
        'Reservation deleted successfully'
      );
    });
  });
});
