const User = require("../models/user");
const bcrypt = require("bcryptjs");

const { jwtSign } = require("../utils/auth-helper");
const HttpError = require("http-errors");
exports.signUp = async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const authority = req.body.authority;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      name: name,
      password: hashedPassword,
      authority: authority,
    });
    user.save();

    const token = jwtSign(
      user.email,
      user._id.toString(),

      user.authority,
      user.name
    );
    return res.status(201).json({
      token: token,
    });
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal error!!");
    next(error);
  }
};
exports.logIn = async (req, res, next) => {
  const email = req.body.email;

  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      const error = new HttpError(401, "Invalid password!");
      next(error);
    }
    const token = jwtSign(
      user.email,
      user._id.toString(),

      user.authority,
      user.name
    );

    return res.status(200).json({
      token: token,
    });
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal Error!");
    next(error);
  }
};
