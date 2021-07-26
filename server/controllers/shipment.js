const Shipment = require("../models/shipment");
const HttpError = require("http-errors");
exports.getShipments = async (req, res, next) => {
  const { query, select, cursor } = req.querymen;

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
      const error = new HttpError(404, "Shipments Not Found");
      next(error);
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
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal error!");
    next(error);
  }
};

exports.createShipment = async (req, res, next) => {
  console.log("Hellozzzzzzzz create Shipment");
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
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal error!");
    next(error);
  }
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
  console.log("Hellozzzzzzzz edite Shipment");
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
      const error = new HttpError(404, "Shipment not found!");
      next(error);
    }

    const populatedShipment = await Shipment.populate(shipment, {
      path: "client creator",
      select: "name",
    });

    res.status(201).json({
      message: "Shipment edited successfully",
      shipment: populatedShipment,
    });
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal error!");
    next(error);
  }
};
exports.deleteShipment = async (req, res, next) => {
  const id = req.body.id;

  try {
    const shipment = await Shipment.findByIdAndRemove(id);
    if (!shipment) {
      const error = new HttpError(404, "Shipment not found!");
      next(error);
    }
    res.status(201).json({
      message: "Shipment deleted successfully",
      shipment: shipment,
    });
  } catch (e) {
    const error = new HttpError(500, e.message || "Internal error!");
    next(error);
  }
};
