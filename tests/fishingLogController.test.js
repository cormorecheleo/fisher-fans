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

      const response = await request(app)
      .post('/auth/login')
      .send({
        email: "jesttests@doe.com",
        password: "yourpassword"
      });
    

    token = response.body.token;
  }, 50000);

  beforeEach(async () => {
    // await FishingLog.deleteMany({});
  });

  afterAll(async () => {
    await FishingLog.deleteOne({fishName: 'Trout'});
    await mongoose.connection.close();
  });

  it('should create a new fishing log', async () => {
    await FishingLog.deleteOne({fishName: 'Trout'});
    const response = await request(app)
      .post('/fishing-log')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...testObject,
      })
      .expect(201);

    expect(response.body.fishName).toBe('New Catch');
  }, 10000);

  it('should update a fishing log', async () => {
    const fishingLog = await new FishingLog({
      ...testObject,
      fishName: "Big Fish"
    }).save();

    const response = await request(app)
      .put(`/fishing-log/${fishingLog._id}`)
      .set('Authorization', `Bearer ${token}`)
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
      .delete(`/fishing-log/${fishingLog._id}`)
      .set('Authorization', `Bearer ${token}`)
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
      .get('/fishing-log/search')
      .expect(200);

    expect(response.body.length).toBeGreaterThanOrEqual(2);
  }, 10000);
});
