const express = require("express");

const { validate, statmentValidationRules } = require("../utils/validator");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const statmentController = require("../controllers/statment");
router.get(
  "/statment",
  isAuth,
  statmentValidationRules(),
  validate,
  statmentController.getStatement
);

module.exports = router;
