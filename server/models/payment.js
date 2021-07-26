const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
const paymentShema = new Schema(
  {
    recipient: {
      type: String,
      required: true,
    },
    cash: {
      type: Number,
      required: true,
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
    date: {
      type: Date,
      default: Date.now,
    },
    //TODO
    //Add List of  editeBy
  },
  { timestamps: true }
);
paymentShema.plugin(mongoosePaginate);
module.exports = mongoose.model("Payment", paymentShema);
