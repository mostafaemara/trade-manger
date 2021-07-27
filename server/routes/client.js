const express = require("express");

const {
  validate,
  clientValidationRules,
  editeClientValidationRules,
  deleteClientValidationRules,
} = require("../utils/validator");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const clientController = require("../controllers/client");
router.get("/clients", isAuth, clientController.getClients);
router.get(
  "/clientsStatements", //,// isAuth, //
  clientController.clientsStatement
);

router.post(
  "/client",
  isAuth,
  clientValidationRules(),
  validate,

  clientController.createClient
);
router.put(
  "/client",
  isAuth,
  editeClientValidationRules(),
  validate,

  clientController.editeClient
);
router.delete(
  "/client",
  isAuth,
  deleteClientValidationRules(),
  validate,

  clientController.deleteClient
);
module.exports = router;
