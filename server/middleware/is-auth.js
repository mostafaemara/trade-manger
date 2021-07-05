const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Unauthorized Request Not Logged In!!");
    error.statusCode = 401;
    throw error;
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "supersecert");
  } catch (e) {
    const error = new Error("Unauthorized Request Not Logged In!!");
    error.statusCode = 500;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Unauthorized Request Not Logged In!!");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  console.log(decodedToken.userId + "sasasasas");
  next();
};
