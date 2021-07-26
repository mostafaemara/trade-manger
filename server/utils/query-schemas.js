const { Schema } = require("querymen");

exports.shipmentsQuerySchema = new Schema(
  {
    dateBefore: {
      type: Date,
      paths: ["date"],
      operator: "$lte",
    },
    dateAfter: {
      type: Date,
      paths: ["date"],
      operator: "$gte",
    },

    client: {
      type: String,
      path: "_id",
    },
  },
  {}
);
exports.PaymentsQuerySchema = new Schema(
  {
    dateBefore: {
      type: Date,
      paths: ["date"],
      operator: "$lte",
    },
    dateAfter: {
      type: Date,
      paths: ["date"],
      operator: "$gte",
    },

    client: {
      type: String,
      path: "_id",
    },
  },
  {}
);
