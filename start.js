const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const app = require('./server');

const port = process.env.PORT || 3000;

// Charger le certificat SSL et la clé privée
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
    // Créer un serveur HTTPS
    https.createServer(options, app).listen(port, () => {
        console.log(`HTTPS Server listening on port ${port}`);
    });
})
.catch(err => console.log(err));
