
// const request = require('supertest'); const app = require('../server');
// const mongoose = require('mongoose');
// const User = require('../models/User');

// describe('Auth Controller Tests', () => {
//   beforeAll(async () => {
//     await mongoose.connect(process.env.MONGODB_URI);
//   }, 30000);

//   beforeEach(async () => {
//     await User.deleteMany({});
//   });

//   afterAll(async () => {
//     await User.deleteMany();
//     await mongoose.connection.close();
//   });

//   it('should sign up a new user', async () => {
//     const response = await request(app)
//       .post('/signup')
//       .send({
//         name: "Test User",
//         email: "test@example.com",
//         password: "password123"
//       })
//       .expect(201);

//     expect(response.body.token).toBeDefined();
//   }, 30000);

//   it('should login an existing user', async () => {
//     const user = await User.create({
//       name: "Test User",
//       email: "login@example.com",
//       password: "password123"
//     });

//     const response = await request(app)
//       .post('/login')
//       .send({
//         email: "login@example.com",
//         password: "password123"
//       })
//       .expect(200);

//     expect(response.body.token).toBeDefined();
//   }, 10000);
// });
