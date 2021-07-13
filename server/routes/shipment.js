const express = require("express");
const { body, check } = require("express-validator");
const router = express.Router();
const { validate, shipmentValidationRules, editeShipmentValidationRules, deleteShipmentValidationRules } = require("../utils/validator");
const shipmentsController = require("../controllers/shipment");
const isAuth = require("../middleware/is-auth");
const user = require("../models/user");
router.get("/shipments", isAuth, shipmentsController.getShipments);
router.post(
  "/shipment",
  isAuth,
  shipmentValidationRules(),
  validate,
  shipmentsController.createShipment
);
router.post(
  "/editeShipment",
  isAuth,
  editeShipmentValidationRules(),
  validate,
  shipmentsController.editeShipment
);
router.post(
  "/deleteShipment",
  isAuth,
  deleteShipmentValidationRules(),
  validate,
  shipmentsController.deleteShipment
);
router.get("/test", shipmentsController.test);
module.exports = router;
