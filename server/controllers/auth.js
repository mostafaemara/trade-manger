const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),

        authority: user.authority,
        name: user.name,
      },
      "supersecert",
      {
        expiresIn: "12h",
      }
    );
    return res.status(201).json({
      token: token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
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
      const error = Error("incorrect password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),

        authority: user.authority,
        name: user.name,
      },
      "supersecert",
      {
        expiresIn: "12h",
      }
    );

    return res.status(200).json({
      token: token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
