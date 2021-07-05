const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
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
module.exports = mongoose.model("Client", clientSchema);
