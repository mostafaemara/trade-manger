const jwt = require("jsonwebtoken");
const HttpError = require("http-errors");
const API_AUTH_KEY = "ScCt3mkV+evE3WwtyaxB45YVRveH0uM0";
const API_AUTH_ALG = "HS256";
const API_AUTH_EXP = "12h";

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new HttpError(401, "Unauthorized Request Not Logged In!!");

    next(error);
  }
  const token = req.get("Authorization").split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, API_AUTH_KEY, {
      algorithms: [API_AUTH_ALG],
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
