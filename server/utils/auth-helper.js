const jwt = require("jsonwebtoken");
const API_AUTH_KEY = "ScCt3mkV+evE3WwtyaxB45YVRveH0uM0";
const API_AUTH_ALG = "HS256";
const API_AUTH_EXP = "12h";
exports.jwtSign = (
  email,
  userId,

  authority,
  name
) => {
  const token = jwt.sign(
    {
      email,
      userId,

      authority,
      name,
    },
    API_AUTH_KEY,
    { algorithm: API_AUTH_ALG, expiresIn: API_AUTH_EXP }
  );

  return token;
};
