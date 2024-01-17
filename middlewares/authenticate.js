const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      throw new Error('Token not provided.');
    }

    console.log("Token", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    req.userId = decoded._id;
    console.log("Decoded User", decoded);
    next();
  } catch (e) {
    console.error("Authentication Error:", e.message);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticate;