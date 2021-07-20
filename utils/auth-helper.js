import jwt from "jsonwebtoken";
const API_AUTH_KEY = "ScCt3mkV+evE3WwtyaxB45YVRveH0uM0";

export const checkToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, API_AUTH_KEY);
    return decodedToken;
  } catch (e) {
    throw e;
  }
};
