'use strict';
var __importDefault = (this && this.__importDefault) || function(mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.orderRouter = void 0;
var express_1 = __importDefault(require('express'));
var Orders_1 = require('../Controllers/Orders');
var orderRouter = express_1.default.Router();
exports.orderRouter = orderRouter;
orderRouter.route('/').get(Orders_1.index).post(Orders_1.create);
orderRouter.route('/:oid').get(Orders_1.search).delete(Orders_1.erase);
