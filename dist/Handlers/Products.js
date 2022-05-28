'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.prodRouter = void 0;
var express_1 = __importDefault(require('express'));
var Products_1 = require('../Controllers/Products');
var prodRouter = express_1.default.Router();
exports.prodRouter = prodRouter;
// Products Routes
prodRouter.route('/').get(Products_1.index).post(Products_1.create);
prodRouter.route('/:pid').get(Products_1.search).delete(Products_1.erase);
