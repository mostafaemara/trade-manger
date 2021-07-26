const express = require("express");
const router = express.Router();
const { middleware: query } = require("querymen");
const { PaymentsQuerySchema } = require("../utils/query-schemas");
const {
  validate,
  paymentValidationRules,
  editePaymentValidationRules,
  deletePaymentValidationRules,
} = require("../utils/validator");
const paymentController = require("../controllers/payment");
const isAuth = require("../middleware/is-auth");
router.get(
  "/payments",
  isAuth,
  query(PaymentsQuerySchema),
  paymentController.getPayments
);
router.post(
  "/payment",
  paymentValidationRules(),
  validate,
  isAuth,
  paymentController.createPaytment
);
router.put(
  "/payment",
  editePaymentValidationRules(),
  validate,
  isAuth,
  paymentController.editePayment
);
router.delete(
  "/payment",
  deletePaymentValidationRules(),
  validate,
  isAuth,
  paymentController.deletePayment
);
module.exports = router;
