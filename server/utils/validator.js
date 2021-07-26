const { check, validationResult } = require("express-validator");
const HttpError = require("http-errors");
const User = require("../models/user");
const Client = require("../models/client");
const userLoginValidationRules = () => {
  return [
    check("email")
      .exists()
      .withMessage("Email required please enter email!")
      .isEmail()
      .withMessage("Invalid email format!")
      .custom((email) => {
        return User.findOne({ email: email }).then((user) => {
          if (!user) {
            return Promise.reject("Email Not Registerd!");
          }
        });
      }),
    check("password")
      .exists()
      .withMessage("Password required!")
      .isString()
      .withMessage("Invalid Password Format!"),
  ];
};
const userSignUpValidationRules = () => {
  return [
    check("email")
      .exists("Email required please enter email!")
      .withMessage("Email Is Missing")
      .isEmail()
      .withMessage("Invalid email format!")
      .custom((email) => {
        return User.findOne({ email: email }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use!");
          }
        });
      }),
    check("password")
      .exists("Password required!")
      .isString("Invalid password format!")
      .isLength({ min: 10 }, "Password is too short!"),
    check("authority")
      .exists("Authority required")
      .isInt(
        { min: 0, max: 10 },
        "Invalid value please enter number between 0 to 10"
      ),
    check("name")
      .exists("Name is required!")
      .isString("invalid value text required!"),
  ];
};
const clientValidationRules = () => {
  return [
    check("name")
      .exists("name is required!")
      .isString("Invalid value text required"),
    check("phoneNumber")
      .exists("phoneNumber is required!")
      .isString("Invalid value required text!"),
    // check("creator")
    //   .exists()
    //   .isString()
    //  .custom((userId) => {
    //    return User.findById(userId).then((user) => {
    //    if (!user) {
    //      return Promise.reject("Creator Not Exisit");
    //    }
    //  });
    //  }),
  ];
};
const shipmentValidationRules = () => {
  return [
    check("gauge")
      .exists("Required!")
      .isNumeric("Invalid format required number"),
    check("extraGauge")
      .exists("Required!")
      .isNumeric("Invalid format required number"),
    check("extraBags")
      .exists("Required!")
      .isNumeric("Invalid format required number"),
    check("isPriced")
      .exists("Required!")
      .isBoolean("Invalid format required boolean"),
    check("date")
      .exists("Required!")
      .isISO8601("invalid format required iso8601"),
    check("bags")
      .exists("Required!")
      .isNumeric("Invalid format required number"),
    check("weight")
      .exists("Required!")
      .isNumeric("Invalid format required number"),
    check("pricePerKantar")
      .exists("Required!")
      .isNumeric("Invalid format required number"),
    check("expenses")
      .exists("Required!")
      .isNumeric("Invalid format required number"),
    check("client")
      .exists("Required")
      .isString("Invalid format required text")
      .custom((clientId) => {
        return Client.findById(clientId).then((client) => {
          if (!client) {
            return Promise.reject("Client Not Exisit!");
          }
        });
      }),
    //   check("creator")
    //    .exists()
    //    .isString()
    //     .custom((userId) => {
    //      return User.findById(userId).then((user) => {
    //       if (!user) {
    //       return Promise.reject("Creator Not Exisit");
    //     }
    //   });
    //   }),
  ];
};
const editeShipmentValidationRules = () => {
  return [
    check("id").exists("Required"),
    check("gauge").optional().isNumeric("Invalid format required number"),
    check("extraGauge").optional().isNumeric("Invalid format required number"),
    check("extraBags").optional().isNumeric("Invalid format required number"),
    check("isPriced").optional().isBoolean("Invalid format required boolean"),
    check("date").optional().isISO8601("invalid format required iso8601"),
    check("bags").optional().isNumeric("Invalid format required number"),
    check("weight").optional().isNumeric("Invalid format required number"),
    check("pricePerKantar")
      .optional()
      .isNumeric("Invalid format required number"),
    check("expenses").optional().isNumeric("Invalid format required number"),

    //   check("creator")
    //    .exists()
    //    .isString()
    //     .custom((userId) => {
    //      return User.findById(userId).then((user) => {
    //       if (!user) {
    //       return Promise.reject("Creator Not Exisit");
    //     }
    //   });
    //   }),
  ];
};
const deleteShipmentValidationRules = () => {
  return [check("id").exists("Required")];
};
const paymentValidationRules = () => {
  return [
    check("date")
      .exists("Required")
      .isISO8601("invalid format required iso8601!"),
    check("recipient")
      .exists("Required")
      .isString("Invalid format required text!"),
    check("cash")
      .exists("Required")
      .isNumeric("Invalid format required number!"),
    check("client")
      .exists("Required")
      .isString("Invalid format required text!")
      .custom((clientId) => {
        return Client.findById(clientId).then((client) => {
          if (!client) {
            return Promise.reject("Client Not Exisit!");
          }
        });
      }),
    // check("creator")
    //   .exists()
    //    .isString()
    //     .custom((userId) => {
    //       return User.findById(userId).then((user) => {
    //        if (!user) {
    //          return Promise.reject("Creator Not Exisit");
    //       }
    //  });
    //    }),
  ];
};
const editePaymentValidationRules = () => {
  return [
    check("id").exists("Required").withMessage("Required id"),
    check("date").optional().isISO8601("invalid format required iso8601!"),
    check("recipient").optional().isString("Invalid format required text!"),
    check("cash").optional().isNumeric("Invalid format required number!"),

    // check("creator")
    //   .exists()
    //    .isString()
    //     .custom((userId) => {
    //       return User.findById(userId).then((user) => {
    //        if (!user) {
    //          return Promise.reject("Creator Not Exisit");
    //       }
    //  });
    //    }),
  ];
};
const deletePaymentValidationRules = () => {
  return [check("id").exists("Required").withMessage("Required id")];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const error = new HttpError(422, "Invalid Input", {
    inputs: errors.mapped(),
  });
  next(error);
};
module.exports = {
  userLoginValidationRules,
  validate,
  userSignUpValidationRules,
  clientValidationRules,
  shipmentValidationRules,
  paymentValidationRules,
  editeShipmentValidationRules,
  deleteShipmentValidationRules,
  editePaymentValidationRules,
  deletePaymentValidationRules,
};
