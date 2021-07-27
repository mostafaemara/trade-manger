const { expect } = require("chai");
const sinon = require("sinon");
const clientController = require("../server/controllers/client");
const User = require("../server/models/user");
const mongoose = require("mongoose");

describe("Auth Controller - Login", () => {
  it("tezak 7amra", async () => {
    await mongoose.connect(
      "mongodb+srv://sasa:iamawesome123@max.w4kyv.mongodb.net/trade-manger-test?retryWrites=true&w=majority"
    );

    const res = {};
    const req = {};
    await clientController.clientsStatement(req, res, (req, res, next, err) => {
      console.log("Res", res);
      console.log("Res", req);
      console.log("Res", next);
      console.log("Res", err);
    });
  });
});
