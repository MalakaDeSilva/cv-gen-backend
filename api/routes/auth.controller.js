const admin = require("firebase-admin");

// This function will be used as a middleware for endpoints that require authorization to be used
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Get authorization from header

  if (authHeader) {
    const idToken = authHeader.split(" ")[1]; // Split and get the token
    admin
      .auth()
      .verifyIdToken(idToken) // verify the token
      .then(function (decodedToken) {
        return next();
      })
      .catch(function (error) {
        console.log(error);
        return res.sendStatus(403); // If verification is failed, return 403 (Forbidden)
      });
  } else {
    res.sendStatus(401); // If no token is available, return 401 (Unauthorized)
  }
};

module.exports = {
  authenticateJWT,
};
