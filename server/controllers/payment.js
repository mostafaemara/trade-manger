const Payment = require("../models/payment");
const Client = require("../models/client");
const HttpError = require("http-errors");
exports.getPayments = async (req, res, next) => {
  const { query, select, cursor } = req.querymen;
  try {
    const data = await Payment.paginate(query, {
      populate: [
        {
          path: "client",
          select: "name",
        },
        {
          path: "creator",
          select: "name",
        },
      ],
      offset: cursor.skip,
      limit: cursor.limit,
      select: select,
      sort: cursor.sort,
    });

    if (!data) {
      const error = new HttpError(404, "No payments found!");
      next(error);
    }
    res.status(200).json({
      totalItems: data.totalDocs,
      payments: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      pagingCounter: data.pagingCounter,
    });
  } catch (e) {
    const error = new HttpError(500, e.messege || "Internal error");
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
  } catch (e) {
    const error = new HttpError(500, e.messege || "Internal error");
    next(error);
  }
};
