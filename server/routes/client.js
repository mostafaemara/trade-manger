const express = require("express");

const { validate, clientValidationRules } = require("../utils/validator");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const clientController = require("../controllers/client");
router.get("/clients", isAuth, clientController.getClients);
router.get("/clientsStatements", isAuth, clientController.clientsStatement);

router.post(
  "/client",
  isAuth,
  clientValidationRules(),
  validate,

  clientController.createClient
);
module.exports = router;
