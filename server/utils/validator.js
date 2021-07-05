const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const Client = require("../models/client");
const userLoginValidationRules = () => {
  return [
    check("email")
      .exists()
      .isEmail()
      .custom((email) => {
        return User.findOne({ email: email }).then((user) => {
          if (!user) {
            return Promise.reject("Email Not Registerd");
          }
        });
      }),
    check("password").exists().isString(),
  ];
};
const userSignUpValidationRules = () => {
  return [
    check("email")
      .exists()
      .withMessage("Email Is Missing")
      .isEmail()
      .custom((email) => {
        return User.findOne({ email: email }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      }),
    check("password").exists().isString().isLength({ min: 10 }),
    check("authority").exists().isInt({ min: 0, max: 10 }),
    check("name").exists().isString(),
  ];
};
const clientValidationRules = () => {
  return [
    check("name").exists().isString(),
    check("phoneNumber").exists().isString(),
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
    check("gauge").exists().isNumeric(),
    check("extraGauge").exists().isNumeric(),
    check("extraBags").exists().isNumeric(),
    check("isPriced").exists().isBoolean(),
    check("date").exists().isISO8601(),
    check("bags").exists().isNumeric(),
    check("weight").exists().isNumeric(),
    check("pricePerKantar").exists().isNumeric(),
    check("expenses").exists().isNumeric(),
    check("client")
      .exists()
      .isString()
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
    check("id").exists(),
    check("gauge").optional() .isNumeric(),
    check("extraGauge").optional() .isNumeric(),
    check("extraBags").optional() .isNumeric(),
    check("isPriced").optional() .isBoolean(),
    check("date").optional() .isISO8601(),
    check("bags").optional() .isNumeric(),
    check("weight").optional() .isNumeric(),
    check("pricePerKantar").optional() .isNumeric(),
    check("expenses").optional() .isNumeric(),
 
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
  return [
    check("id").exists(),

  ];
};
const paymentValidationRules = () => {
  return [
    check("date").exists().isISO8601(),
    check("recipient").exists().isString(),
    check("cash").exists().isNumeric(),
    check("client")
      .exists()
      .isString()
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
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
module.exports = {
  userLoginValidationRules,
  validate,
  userSignUpValidationRules,
  clientValidationRules,
  shipmentValidationRules,
  paymentValidationRules,
  editeShipmentValidationRules, deleteShipmentValidationRules
};
