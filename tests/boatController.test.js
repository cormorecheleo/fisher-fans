// tests/boatController.test.js
const request = require('supertest');
const app = require('../server'); // Importez votre application Express
const mongoose = require('mongoose');
const Boat = require('../models/Boat'); // Assurez-vous que le chemin est correct

let token;
let testObject = {
    "Nom": "Jest boat",
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
    "PuissanceDuMoteur": 350,
    "createdBy": "65a81b451b05bb94dbd1bb61"
  };

describe('Boat Controller Tests', () => {
  let boat;
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
    // await Boat.deleteOne({ Nom: "Jest boat" });
  });

  afterAll(async () => {
    await Boat.deleteOne({ Nom: "Jest boat" });
    await mongoose.connection.close();
  });

  it('should create a new boat', async () => {
    await Boat.deleteOne({ Nom: "Jest boat" });
    const response = await request(app)
      .post('/boats')
      .set('Authorization', `Bearer ${token}`)
      .send(
        {
          ...testObject
        }
      )
      .expect(201);
    boat = response.body;

    expect(response.body.Nom).toBe('Jest boat');
  }, 10000);

  it('should update a boat', async () => {
    const response = await request(app)
      .put(`/boats/${boat._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        Marque: 'Updated Boat',
      })
      .expect(200);

    expect(response.body.Marque).toBe(undefined)
  }, 10000);

  it('should delete a boat', async () => {
    const boat = await new Boat(
      {
        ...testObject
      }
    ).save();
    await request(app)
      .delete(`/boats/${boat._id}`)
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);
  }, 10000);
});
