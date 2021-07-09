const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const shipmentShema = new Schema(
  {
    bags: {
      type: Number,
      required: true,
    },
    extraBags: {
      type: Number,
      default: 0
    },
    extraGauge: {
      type: Number,
      default: 1
    },

    isPriced: {
      type: Boolean,
      default: true
    },
    gauge: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    pricePerKantar: {
      type: Number,
      required: true,
    },
    expenses: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //TODO
    //Add List of  editeBy
  },
  { timestamps: true }
);

shipmentShema.plugin(mongoosePaginate);
module.exports = mongoose.model("Shipment", shipmentShema);
