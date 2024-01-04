const mongoose = require('mongoose');
const app = require('./server');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})
.catch(err => console.log(err));
