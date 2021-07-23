exports.logErrors = (error, req, res, next) => {
  console.error(error);
  next(error);
};

exports.clientErrorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  if (status === 422) {
    return res.status(status).json({
      message: error.message,
      inputs: error.inputs,
    });
  }
  return res.status(status).json({
    message: error.message,
  });
};
