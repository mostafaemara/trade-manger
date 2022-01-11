const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const actions = require("mongoose-rest-actions");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const clientRoutes = require("./routes/client");
const shipmentRoutes = require("./routes/shipment");
const paymentRoutes = require("./routes/payment");
const statmentRoutes = require("./routes/statment");
const authRoutes = require("./routes/auth");
const {
  logErrors,
  clientErrorHandler,
} = require("./middleware/error-handlers");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    mongoose.plugin(actions);
    const app = express();

    //init express js
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());

    //set routes

    app.use("/api", clientRoutes);
    app.use("/api", shipmentRoutes);
    app.use("/api", paymentRoutes);

    app.use("/api", statmentRoutes);

    app.use("/api", authRoutes);
    app.all("/api", (req, res, next) => {
      res.status(200).json({
        endpoints: {
          shipments: "shipments",
          payments: "payments",
          clients: "clients",
          addShipment: "shipment",
          addPayment: "payment",
          addClient: "client",
          example: "localhost:8888/api/shipment",
        },
      });
    });
    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.use(logErrors);
    app.use(clientErrorHandler);

    mongoose
      .connect(
        "mongodb config"
      )
      .then((result) => {
        console.error(process.env.NODE_ENV);
        const port = process.env.PORT || 3000;
        console.log("connected to Db");
        app.listen(port);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => {
    process.exit(1);
  });
