const request = require('supertest');
const app = require('../server'); // Assurez-vous que c'est le bon chemin
const mongoose = require('mongoose');
const FishingLog = require('../models/FishingLog'); // Assurez-vous que le chemin est correct
const User = require('../models/User'); // Nécessaire pour créer un utilisateur de test

describe('FishingLog Controller Tests', () => {
  let token;
  let testUser;
  let fishingLog;

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

    // Créer un FishingLog de test
    fishingLog = await FishingLog.create({
      fishName: "Trout",
      pictureUrl: "http://example.com/picture.jpg",
      comment: "Beautiful day at the lake",
      length: 20,
      weight: 2,
      place: "Lake Test",
      date: new Date(),
      releaseFish: true,
      ownerFishingLogId: testUser._id
    });
  }, 50000);


  afterAll(async () => {
    await FishingLog.deleteOne({ fishName: "Trout" });
    await mongoose.connection.close();
  });

  it('should create a new FishingLog', async () => {
    const newFishingLogData = {
      fishName: "string",
      pictureUrl: "string",
      comment: "string",
      length: 0,
      weight: 0,
      place: "string",
      date: "2024-01-18",
      releaseFish: true,
      ownerFishingLogId: "65a8eb104a295bd7c0131771"
    };

    let response;
    try {
      response = await request(app)
        .post('/fishing-log')
        .set('Authorization', `Bearer ${token}`)
        .send(newFishingLogData)
        .expect(201);
    } catch (error) {
      if (error.response) {
        console.error("La requête a échoué avec la réponse: ", error.response.body);
      } else {
        console.error("Une erreur s'est produite : ", error.message);
      }
      throw error;
    }
    expect(response.body).toHaveProperty('_id');
    expect(response.body.fishName).toBe(newFishingLogData.fishName);
    expect(response.body.pictureUrl).toBe(newFishingLogData.pictureUrl);
    expect(response.body.comment).toBe(newFishingLogData.comment);
    expect(response.body.length).toBe(newFishingLogData.length);
    expect(response.body.weight).toBe(newFishingLogData.weight);
    expect(response.body.place).toBe(newFishingLogData.place);
  });

  it('should update a FishingLog', async () => {
    const updates = {
      fishName: "string",
      pictureUrl: "strisefsefsefng",
      comment: "string",
      length: 0,
      weight: 0,
      place: "string",
      date: "2024-01-18",
      releaseFish: true
    };
    const response = await request(app)
      .patch(`/fishing-log/${fishingLog._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updates)
  });


  it('should delete a FishingLog', async () => {
    const deleteFishingLogData = {
      fishName: "totofish",
      pictureUrl: "string",
      comment: "string",
      length: 0,
      weight: 0,
      place: "string",
      date: "2024-01-18",
      releaseFish: true,
      ownerFishingLogId: "65a8eb104a295bd7c0131771"
    };
    let response;
    try {
      response = await request(app)
        .post('/fishing-log')
        .set('Authorization', `Bearer ${token}`)
        .send(deleteFishingLogData)
        .expect(201);
    } catch (error) {
      if (error.response) {
        console.error("La requête a échoué avec la réponse: ", error.response.body);
      } else {
        console.error("Une erreur s'est produite : ", error.message);
      }
      throw error;
    }
    await request(app)
      .delete(`/fishing-log/${response.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const deletedLog = await FishingLog.findById(response.body._id);
    expect(deletedLog).toBeNull();
  });
});
