const Payment = require("../models/payment");
const Client = require("../models/client");

exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate("client", "name")
      .populate("creator", "name");

    if (!payments) {
      const error = Error("no Payments FOund");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      messege: "payments fetched Succes",
      payments: payments,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.createPaytment = async (req, res, next) => {
  const recipient = req.body.recipient;
  const cash = req.body.cash;
  const client = req.body.client;

  const payment = Payment({
    recipient: recipient,
    cash: cash,
    client: client,
    creator: req.userId,
  });
  try {
    const createdPayment = await payment.save();

    const populatedPayment = await Payment.populate(createdPayment, {
      path: "creator client",
      select: "name",
    });
    res.status(201).json({
      messege: "payment cteated Successfully",
      payment: populatedPayment,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
