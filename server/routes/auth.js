const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

const {
  validate,
  userLoginValidationRules,
  userSignUpValidationRules,
} = require("../utils/validator");
router.post(
  "/login",
  userLoginValidationRules(),
  validate,
  authController.logIn
);
//router.post(
// "/signup",
// userSignUpValidationRules(),
//  validate,
//  authController.signUp
//);
module.exports = router;
