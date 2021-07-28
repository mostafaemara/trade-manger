const Shipment = require("../models/shipment");
const Payment = require("../models/payment");
const HttpError = require("http-errors");

exports.getStatement = async (req, res, next) => {
  try {
    console.log("asasfasfasfasfasf");
    const id = req.body.id;

    let statment = {};
    const shipments = await Shipment.find(
      { client: id },
      "bags gauge weight pricePerKantar expenses isPriced extraBags extraGauge"
    );
    const payments = await Payment.find({ client: id }, "cash");
    if (!payments && !shipments) {
      statement = {
        client: id,
        shipments: [],
        payments: [],
        debts: 0,
        dues: 0,
        totalNetWeight: 0,
        totalKantarWeight: 0,
        totalKantarWeight: 0,
      };
    } else {
      statment = calculateStatement(shipments, payments, id);
    }

    res.json({
      statment: statment,
    });
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal Error ");
    next(error);
  }
};
function calculateStatement(shipments, payments, id) {
  const totalShipmentsPrice = calculateShipmentsPrices(shipments);
  const totalCash = calculatePaymentsCash(payments);
  const totalNetWeight = calculateTotalNetWeight(shipments);
  const totalKantarWeight = calculateKantarWeight(totalNetWeight);

  return {
    client: id,
    shipments: shipments,
    payments: payments,
    debts: totalShipmentsPrice,
    dues: totalCash,
    totalNetWeight: totalNetWeight,
    totalKantarWeight,
    totalKantarWeight,
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
