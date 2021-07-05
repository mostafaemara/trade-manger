const express = require("express");
const router = express.Router();
const { validate, paymentValidationRules } = require("../utils/validator");
const paymentController = require("../controllers/payment");
const isAuth = require("../middleware/is-auth");
router.get("/payments", isAuth, paymentController.getPayments);
router.post(
  "/payment",
  paymentValidationRules(),
  validate,
 isAuth,
  paymentController.createPaytment
);
module.exports = router;
