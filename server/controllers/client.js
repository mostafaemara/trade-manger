const Client = require("../models/client");
const Shipment = require("../models/shipment");
const Payment = require("../models/payment");
const HttpError = require("http-errors");
const { contextsKey } = require("express-validator/src/base");
exports.getClients = (req, res, next) => {
  Client.find()
    .populate("creator", "name")
    .then((clients) => {
      if (!clients) {
        const error = new HttpError(404, "Client not found!");
        next(error);
      }
      res.status(200).json({
        message: "",
        clients: clients,
      });
    })
    .catch((e) => {
      const error = new HttpError(500, e.message || "internal error");
      next(error);
    });
};

exports.createClient = async (req, res, next) => {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const client = Client({
    name: name,
    phoneNumber: phoneNumber,
    creator: req.userId,
  });
  try {
    const createdClient = await client.save();
    const populatedClient = await Client.populate(createdClient, {
      path: "creator",
      select: "name",
    });

    res.status(201).json({
      message: "Client created successfully",
      client: populatedClient,
    });
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal Error ");
    next(error);
  }
};

exports.clientsStatement = async (req, res, next) => {
  try {
    const clients = await Client.find({}, "name");
    if (!clients) {
      const error = new HttpError(404, "Client not found!");
      next(error);
    }
    const statements = [];
    for (let client of clients) {
      const shipments = await Shipment.find(
        { client: client._id },
        "bags gauge weight pricePerKantar expenses isPriced extraBags extraGauge"
      );
      const payments = await Payment.find({ client: client._id }, "cash");
      if (!payments && !shipments) {
        statements.push({
          client: client,
          debts: 0,
          dues: 0,
        });
      } else {
        const statment = calculateStatement(shipments, payments, client);
        statements.push(statment);
      }
    }
    res.json(statements);
    console.log("Statments::" + statements.toString());
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal Error ");
    next(error);
  }
};
function calculateStatement(shipments, payments, client) {
  const totalShipmentsPrice = calculateShipmentsPrices(shipments);
  const totalCash = calculatePaymentsCash(payments);
  const totalNetWeight = calculateTotalNetWeight(shipments);
  const totalKantarWeight = calculateKantarWeight(totalNetWeight);

  return {
    client: client,
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

exports.editeClient = async (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;

  try {
    const client = await Client.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        phoneNumber: phoneNumber,

        creator: req.userId,
      },
      { new: true }
    );
    if (!client) {
      const error = new HttpError(404, "Client not found!");
      next(error);
    }

    res.status(201).json({
      message: "client edited successfully",
      client: client,
    });
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal error!");
    next(error);
  }
};
exports.deleteClient = async (req, res, next) => {
  const id = req.body.id;

  try {
    const client = await Client.findByIdAndRemove(id);
    if (!client) {
      const error = new HttpError(404, "Client not found!");
      next(error);
    }
    const paymentResult = await Payment.deleteMany({
      client: id,
    });
    const shipmentResult = await Shipment.deleteMany({
      client: id,
    });
    console.log("Shipment Delete Result", shipmentResult);
    console.log("Payment Delete Result", paymentResult);
    res.status(201).json({
      message: "client deleted successfully",
      client: client,
    });
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal error!");
    next(error);
  }
};
