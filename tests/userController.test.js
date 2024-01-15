// const request = require('supertest');
// const app = require('../server');
// const mongoose = require('mongoose');
// const User = require('../models/User');
// const Boat = require('../models/Boat');

// describe('User Controller Tests', () => {
//   beforeAll(async () => {
//     await mongoose.connect(process.env.MONGODB_URI);
//     await User.deleteMany({});
//     await Boat.deleteMany({});
//   }, 50000);

//   afterEach(async () => {
//     await User.deleteMany({});
//   });

//   afterAll(async () => {
//     await User.deleteMany({});
//     await Boat.deleteMany({});
//     await mongoose.connection.close();
//   });

//   beforeEach(async () => {
//     await User.deleteMany({});
//   });


//   // Test pour créer un nouvel utilisateur
//   it('should create a new user', async () => {
//     const response = await request(app)
//       .post('/users')
//       .send({
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: 'password123'
//       })
//       .expect(201);

//     expect(response.body.email).toBe('john@example.com');
//   }, 10000);

//   // Test pour récupérer tous les utilisateurs
//   it('should retrieve all users', async () => {
//     await new User({ name: 'Alice', email: 'alice@example.com', password: 'password123' }).save();

//     const response = await request(app)
//       .get('/users')
//       .expect(200);

//     expect(response.body[0].email).toBe('alice@example.com');
//   }, 10000);

//   // Test pour récupérer un utilisateur par ID
//   it('should retrieve a user by id', async () => {
//     const user = await new User({ name: 'Bob', email: 'bob@example.com', password: 'password123' }).save();

//     const response = await request(app)
//       .get(`/users/${user._id}`)
//       .expect(200);

//     expect(response.body.name).toBe('Bob');
//   }, 10000);

//   // Test pour mettre à jour un utilisateur
//   it('should update a user', async () => {
//     const user = await new User({ name: 'Charlie', email: 'charlie@example.com', password: 'password123' }).save();

//     const response = await request(app)
//       .patch(`/users/${user._id}`)
//       .send({ name: 'Charles' })
//       .expect(200);

//     expect(response.body.name).toBe('Charles');
//   }, 10000);

//   // Test pour supprimer un utilisateur
//   it('should delete a user', async () => {
//     const user = await new User({ name: 'David', email: 'david@example.com', password: 'password123' }).save();

//     await request(app)
//       .delete(`/users/${user._id}`)
//       .expect(200);

//     const deletedUser = await User.findById(user._id);
//     expect(deletedUser).toBeNull();
//   }, 10000);
// });
