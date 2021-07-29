const Shipment = require("../models/shipment");
const Payment = require("../models/payment");
const Client = require("../models/client");
const HttpError = require("http-errors");

exports.getStatement = async (req, res, next) => {
  try {
    const id = req.query.id;
    console.log("IDZ", id);
    const client = await Client.findById(id);
    if (!client) {
      const error = new HttpError(404, "Client not found! ");
      next(error);
    }
    let statment = {};
    const shipments = await Shipment.find(
      { client: id },
      "bags gauge weight pricePerKantar expenses isPriced extraBags extraGauge"
    );
    const notPricedShipments = await Shipment.find(
      { client: id, isPriced: false },
      "_id"
    );
    console.log("Not priced", notPricedShipments.length);
    const payments = await Payment.find({ client: id }, "cash");
    if (!payments && !shipments) {
      statement = {
        client: client,
        shipments: [],
        payments: [],
        debts: 0,
        dues: 0,
        totalNetWeight: 0,
        totalKantarWeight: 0,
        totalKantarWeight: 0,
        remaining: 0,
      };
    } else {
      statment = calculateStatement(shipments, payments);
    }

    res.json({
      statment: { client, notPricedShipments, ...statment },
    });
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal Error ");
    next(error);
  }
};
function calculateStatement(shipments, payments) {
  const totalShipmentsPrice = calculateShipmentsPrices(shipments);
  const totalCash = calculatePaymentsCash(payments);
  const totalNetWeight = calculateTotalNetWeight(shipments);
  const totalKantarWeight = calculateKantarWeight(totalNetWeight);
  const remaining = totalShipmentsPrice - totalCash;
  return {
    shipments: shipments,
    payments: payments,
    debts: totalShipmentsPrice,
    dues: totalCash,
    totalNetWeight: totalNetWeight,
    totalKantarWeight,
    totalKantarWeight,
    remaining: remaining,
  };
}
function calculatePaymentsCash(payments) {
  let totalCash = 0;
  for (let payment of payments) {
    totalCash = payment.cash + totalCash;
  }
  return totalCash;
}

function calculateTotalNetWeight(shipments) {
  let totalNetWeight = 0;

  for (let shipment of shipments) {
    if (shipment.isPriced) {
      const netWeight = calculateNetWeight(shipment);

      totalNetWeight = netWeight + totalNetWeight;
    }
  }
  return totalNetWeight;
}
function calculateNetWeight(shipment) {
  const netWeight = shipment.weight - shipment.bags * shipment.gauge;
  return netWeight;
}

function calculateKantarWeight(netWeight) {
  const kantarNetWeight = netWeight / 157.5;
  return kantarNetWeight;
}

function calculateShipmentsPrices(shipments) {
  let totalShipmentsPrice = 0;

  for (let shipment of shipments) {
    if (shipment.isPriced) {
      totalShipmentsPrice =
        calculateShipmentNetPrice(shipment) + totalShipmentsPrice;
    }
  }
  return totalShipmentsPrice;
}
function calculateShipmentNetPrice(shipment) {
  const netWeight =
    shipment.weight -
    shipment.bags * shipment.gauge -
    shipment.extraBags * shipment.extraGauge;
  const kantarNetWeight = netWeight / 157.5;
  const price = shipment.pricePerKantar * kantarNetWeight;
  return price - shipment.expenses;
}
