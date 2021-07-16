const { Schema } = require("querymen");

exports.shipmentsQuerySchema = new Schema(
  {
    dateAfter: {
      type: Date,
      paths: ["date"],
      operator: "$gte",
    },
    dateBefor: {
      type: Date,
      paths: ["date"],
      operator: "$lte",
    },
    client: {
      type: String,
      path: "_id",
    },
  },
  {}
);
