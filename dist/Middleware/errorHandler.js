'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.errorHandler = void 0;

function errorHandler(error, req, res, next) {
  var status = error.statusCode || 500;
  var mssg = error.message || 'Something Went Wrong';
  res.status(status).send({ status: status, mssg: mssg });
  next();
}

exports.errorHandler = errorHandler;
