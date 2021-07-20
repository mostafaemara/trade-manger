const jwt = require("jsonwebtoken");

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
    process.env.API_AUTH_KEY,
    { algorithm: process.env.API_AUTH_ALG, expiresIn: process.env.API_AUTH_EXP }
  );

  return token;
};
