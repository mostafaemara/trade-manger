const Shipment = require("../models/shipment");

exports.getShipments = async (req, res, next) => {
  const { query, select, cursor } = req.querymen;
  console.log("query of Shipments", req.query, query, select, cursor);
  const { page, limit } = req.query;

  try {
    const data = await Shipment.paginate(query, {
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

    //.populate("client", "name").populate("creator", "name");
    if (!data) {
      const error = new Error("no Clients!");
      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      totalItems: data.totalDocs,
      shipments: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
      pagingCounter: data.pagingCounter,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createShipment = async (req, res, next) => {
  const bags = req.body.bags;
  const gauge = req.body.gauge;
  const weight = req.body.weight;
  const pricePerKantar = req.body.pricePerKantar;
  const expenses = req.body.expenses;
  const client = req.body.client;
  const extraBags = req.body.extraBags;
  const date = req.body.date;
  const extraGauge = req.body.extraGauge;
  const isPriced = req.body.isPriced;

  const shipment = Shipment({
    bags: bags,
    gauge: gauge,
    weight: weight,
    pricePerKantar: pricePerKantar,
    expenses: expenses,
    client: client,
    creator: req.userId,
    isPriced: isPriced,
    extraGauge: extraGauge,
    date: date,
    extraBags: extraBags,
  });
  try {
    const createdShipment = await shipment.save();

    const populatedShipment = await Shipment.populate(createdShipment, {
      path: "client creator",
      select: "name",
    });

    res.status(201).json({
      message: "Shipment created successfully",
      shipment: populatedShipment,
    });
  } catch {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.test = (req, res, next) => {
  const queryObj = { ...req.query };
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(
    /\b(gte)|(gt)|(lte)|(lt)\b/g,
    (match) => `$${match}`
  );

  next();

  Shipment.find(req.query)
    .then((shipments) => {
      next();
    })
    .catch((error) => {});
};

exports.editeShipment = async (req, res, next) => {
  const id = req.body.id;
  const bags = req.body.bags;
  const gauge = req.body.gauge;
  const weight = req.body.weight;
  const pricePerKantar = req.body.pricePerKantar;
  const expenses = req.body.expenses;
  const client = req.body.client;
  const extraBags = req.body.extraBags;
  const date = req.body.date;
  const extraGauge = req.body.extraGauge;
  const isPriced = req.body.isPriced;

  try {
    const shipment = await Shipment.findOneAndUpdate(
      { _id: id },
      {
        bags: bags,
        gauge: gauge,
        weight: weight,
        pricePerKantar: pricePerKantar,
        expenses: expenses,
        client: client,
        creator: req.userId,
        isPriced: isPriced,
        extraGauge: extraGauge,
        date: date,
        extraBags: extraBags,
      },
      { new: true }
    );
    if (!shipment) {
      const error = new Error("no Clients!");
      error.statusCode = 404;

      throw error;
    }

    const populatedShipment = await Shipment.populate(shipment, {
      path: "client creator",
      select: "name",
    });

    res.status(201).json({
      message: "Shipment edited successfully",
      shipment: populatedShipment,
    });
  } catch {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.deleteShipment = async (req, res, next) => {
  const id = req.body.id;

  try {
    const shipment = await Shipment.findByIdAndRemove(id);

    res.status(201).json({
      message: "Shipment deleted successfully",
      shipment: shipment,
    });
  } catch {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
