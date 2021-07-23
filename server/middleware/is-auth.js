const jwt = require("jsonwebtoken");
const HttpError = require("http-errors");
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new HttpError(401, "Unauthorized Request Not Logged In!!");

    next(error);
  }
  const token = req.get("Authorization").split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.API_AUTH_KEY, {
      algorithms: [process.env.API_AUTH_ALG],
    });
    req.userId = decodedToken.userId;

    next();
  } catch (e) {
    const error = new HttpError(
      401,
      e.message || "Unauthorized Request Not Logged In!!"
    );

    next(error);
  }
};
