'use strict';
var __importDefault = (this && this.__importDefault) || function(mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.authenticate = void 0;
var jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
var apiError_1 = require('../Errors/apiError');

function authenticate(req, res, next) {
  var _a;
  try {
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    var secret = process.env.TOKEN_SECRET;
    jsonwebtoken_1.default.verify(token, secret);
    console.log('Here');
    next();
  } catch (e) {
    return next(new apiError_1.apiError(401, 'Could not Authenticate User'));
  }
}

exports.authenticate = authenticate;
