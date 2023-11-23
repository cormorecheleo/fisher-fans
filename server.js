const express = require('express');
const mongoose = require('mongoose');
const boatRoutes = require('./routes'); // Ensure the path is correct
const boatSchema = require('./models/Boat')
const app = express();
const port = 3000;

// MongoDB URI (ensure to replace <password> with your actual password)
const uri = "mongodb+srv://mvaxne:tosrWm1uftNEOPrE@fisherfans.2mwj5fa.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to the database!");
});



// const Boat = mongoose.model('Boat', boatSchema);

// Middleware for parsing JSON
app.use(express.json());

// Boat Routes
app.use(boatRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
