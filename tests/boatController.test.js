// tests/boatController.test.js
const request = require('supertest');
const app = require('../server'); // Importez votre application Express
const mongoose = require('mongoose');
const Boat = require('../models/Boat'); // Assurez-vous que le chemin est correct

let token;
let testObject = {
  "Description": "Luxury yacht with modern amenities",
  "Marque": "YachtMaker",
  "AnneeDeFabrication": 2020,
  "URLDeLaPhoto": "http://example.com/photo.jpg",
  "TypeDePermisRequis": "Yacht",
  "TypeDeBateau": "Yacht",
  "Equipements": "GPS, Radar, Life Jackets",
  "MontantDeLaCaution": 5000,
  "CapaciteMaximum": 10,
  "NombreDeCouchages": 5,
  "PortDAttache": "Marina Bay",
  "PaysDAttache": "France",
  "Latitude": 43.2951,
  "Longitude": 5.3631,
  "TypeDeMotorisation": "Inboard",
  "PuissanceDuMoteur": 350
};

describe('Boat Controller Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    await request(app)
      .post('/signup')
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });

    const response = await request(app)
      .post('/login')
      .send({
        email: "test@example.com",
        password: "password123"
      });
    
    token = response.body.token;
    testObject = {...testObject, createdBy: response.body.user._id}
  }, 50000);

  beforeEach(async () => {
    await Boat.deleteMany({});
  });

  afterAll(async () => {
    await Boat.deleteMany();
    await mongoose.connection.close();
  });

  it('should create a new boat', async () => {
    const response = await request(app)
      .post('/boats')
      .set('Authorization', `Bearer ${token}`)
      .send(
        {
          "Nom": "new boat",
          ...testObject
        }
      )
      .expect(201);

    expect(response.body.Nom).toBe('new boat');
  }, 10000);

  it('should update a boat', async () => {
    const boat = await new Boat(
      {
        "Nom": "new boat2",
        ...testObject
      }
    ).save();

    const response = await request(app)
      .put(`/boats/${boat._id}`)
      .send({
        Nom: 'Updated Boat',
      })
      .expect(200);

    expect(response.body.Nom).toBe('Updated Boat');
  }, 10000);

  it('should delete a boat', async () => {
    const boat = await new Boat(
      {
        "Nom": "Delete Boat",
        ...testObject
      }
    ).save();
    await request(app)
      .delete(`/boats/${boat._id}`)
      .expect(200);

    const deletedBoat = await Boat.findById(boat._id);

    expect(deletedBoat).toBeNull();
  }, 10000);

  it('should search for boats', async () => {
    await new Boat(
      {
        "Nom": "Boat1",
        ...testObject
      }
    ).save();
    await new Boat(
      {
        "Nom": "Boat2",
        ...testObject
      }
    ).save();

    const response = await request(app)
      .get('/boats/search')
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);
  }, 10000);
});
