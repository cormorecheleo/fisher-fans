const request = require('supertest');
const app = require('../server'); // Import your Express application
const mongoose = require('mongoose');
const FishingLog = require('../models/FishingLog'); // Ensure the path is correct

let token;
const testObject = {
  fishName: "Trout",
  pictureUrl: "http://example.com/trout.jpg",
  comment: "Caught a big trout!",
  length: 30,
  weight: 5,
  place: "River",
  date: new Date(),
  releaseFish: false,
  ownerFishingLogId: 1,
};

describe('FishingLog Controller Tests', () => {
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
  }, 50000);

  beforeEach(async () => {
    await FishingLog.deleteMany({});
  });

  afterAll(async () => {
    await FishingLog.deleteMany();
    await mongoose.connection.close();
  });

  it('should create a new fishing log', async () => {
    const response = await request(app)
      .post('/fishingLog')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...testObject,
        fishName: 'new catch'
      })
      .expect(201);

    expect(response.body.fishName).toBe('new catch');
  }, 10000);

  it('should update a fishing log', async () => {
    const fishingLog = await new FishingLog({
      ...testObject,
      fishName: "Big Fish"
    }).save();

    const response = await request(app)
      .put(`/fishingLog/${fishingLog._id}`)
      .send({
        fishName: 'Updated Fish',
      })
      .expect(200);

    expect(response.body.fishName).toBe('Updated Fish');
  }, 10000);

  it('should delete a fishing log', async () => {
    const fishingLog = await new FishingLog({
      fishName: "Delete Fish",
      ...testObject
    }).save();

    await request(app)
      .delete(`/fishingLog/${fishingLog._id}`)
      .expect(200);

    const deletedFishingLog = await FishingLog.findById(fishingLog._id);

    expect(deletedFishingLog).toBeNull();
  }, 10000);

  it('should search for fishing logs', async () => {
    await new FishingLog({
      fishName: "Fish1",
      ...testObject
    }).save();

    await new FishingLog({
      fishName: "Fish2",
      ...testObject
    }).save();

    const response = await request(app)
      .get('/fishingLog/search')
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);
  }, 10000);
});
