const { middleware: query } = require("querymen");
const { shipmentsQuerySchema } = require("../utils/query-schemas");
const express = require("express");

const router = express.Router();
const {
  validate,
  shipmentValidationRules,
  editeShipmentValidationRules,
  deleteShipmentValidationRules,
} = require("../utils/validator");
const shipmentsController = require("../controllers/shipment");
const isAuth = require("../middleware/is-auth");

router.get(
  "/shipments",
  isAuth,
  query(shipmentsQuerySchema),
  shipmentsController.getShipments
);
router.post(
  "/shipment",
  isAuth,
  shipmentValidationRules(),
  validate,
  shipmentsController.createShipment
);
router.put(
  "/editeShipment",
  isAuth,
  editeShipmentValidationRules(),
  validate,
  shipmentsController.editeShipment
);
router.delete(
  "/deleteShipment",
  isAuth,
  deleteShipmentValidationRules(),
  validate,
  shipmentsController.deleteShipment
);

module.exports = router;
