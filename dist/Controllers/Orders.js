'use strict';
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator['throw'](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
  var _ = {
    label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: []
  }, f, y, t, g;
  return g = {
    next: verb(0),
    'throw': verb(1),
    'return': verb(2)
  }, typeof Symbol === 'function' && (g[Symbol.iterator] = function() {
    return this;
  }), g;

  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.getUserOrders = exports.search = exports.erase = exports.create = exports.index = void 0;
var Order_1 = require('../Models/Order');
var Wrappers_1 = require('../Middleware/Wrappers');
var apiError_1 = require('../Errors/apiError');
var orders = new Order_1.OrderTable();
// Return ALl Orders
var index = (0, Wrappers_1.tryCatchWrapExpress)(function(req, res, next) {
  return __awaiter(void 0, void 0, void 0, function() {
    var results;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, orders.listAll()];
        case 1:
          results = _a.sent();
          if (!results || results.length == 0)
            return [2 /*return*/, next(new apiError_1.apiError(404, 'No Orders Found'))];
          res.status(200).json(results);
          return [2 /*return*/];
      }
    });
  });
});
exports.index = index;
// Create a new Order
var create = (0, Wrappers_1.tryCatchWrapExpress)(function(req, res) {
  return __awaiter(void 0, void 0, void 0, function() {
    var newOrder, results;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          newOrder = {
            uid: req.body.uid,
            status: req.body.os,
            date: req.body.date
          };
          return [4 /*yield*/, orders.create(newOrder, req.body.pid, req.body.quantity)];
        case 1:
          results = _a.sent();
          res.status(200).json(results);
          return [2 /*return*/];
      }
    });
  });
});
exports.create = create;
// Delete Order Using ID
var erase = (0, Wrappers_1.tryCatchWrapExpress)(function(req, res, next) {
  return __awaiter(void 0, void 0, void 0, function() {
    var oid, foundID, results;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          oid = Number(req.params.oid);
          return [4 /*yield*/, orders.search(oid)];
        case 1:
          foundID = _a.sent();
          if (!foundID)
            return [2 /*return*/, next(new apiError_1.apiError(404, 'Order with ID: '.concat(oid, ' is not found')))];
          return [4 /*yield*/, orders.delete(oid)];
        case 2:
          results = _a.sent();
          res.status(200).json(results);
          return [2 /*return*/];
      }
    });
  });
});
exports.erase = erase;
var search = (0, Wrappers_1.tryCatchWrapExpress)(function(req, res, next) {
  return __awaiter(void 0, void 0, void 0, function() {
    var oid, foundID;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          oid = Number(req.params.oid);
          return [4 /*yield*/, orders.search(oid)];
        case 1:
          foundID = _a.sent();
          if (!foundID)
            return [2 /*return*/, next(new apiError_1.apiError(404, 'Order with ID: '.concat(oid, ' is not found')))];
          res.status(200).json(foundID);
          return [2 /*return*/];
      }
    });
  });
});
exports.search = search;
// Get User's Current Orders
var getUserOrders = (0, Wrappers_1.tryCatchWrapExpress)(function(req, res, next) {
  return __awaiter(void 0, void 0, void 0, function() {
    var uid, foundOrders;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          uid = Number(req.params.uid);
          return [4 /*yield*/, orders.getOrder(uid)];
        case 1:
          foundOrders = _a.sent();
          if (!foundOrders)
            return [2 /*return*/, next(new apiError_1.apiError(404, 'Could Not Get User\'s Orders '))];
          res.status(200).json(foundOrders);
          return [2 /*return*/];
      }
    });
  });
});
exports.getUserOrders = getUserOrders;
