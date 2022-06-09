"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTable = void 0;
var Wrappers_1 = require("../Middleware/Wrappers");
var helpers_1 = require("./helpers");
var db_1 = require("../db");
var OrderTable = /** @class */ (function () {
    function OrderTable() {
    }
    //  List All Orders
    OrderTable.prototype.listAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, Wrappers_1.tryCatchWrap)('Could Not Get All Orders', function () { return __awaiter(_this, void 0, void 0, function () {
                        var sql, results;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    sql = "SELECT users.firstname,\n                          users.lastname,\n                          users.id  as uid,\n                          products.name,\n                          products.price,\n                          products.category,\n                          orders.status,\n                          orders.date,\n                          orders.id AS oid,\n                          quantity\n                   FROM orders\n                            JOIN order_product ON orders.id = order_product.order_id\n                            JOIN products ON products.id = order_product.prod_id\n                            JOIN users ON orders.user_id = users.id";
                                    return [4 /*yield*/, (0, helpers_1.connectQuery)(sql, db_1.client)];
                                case 1:
                                    results = _a.sent();
                                    return [2 /*return*/, results.rows];
                            }
                        });
                    }); })];
            });
        });
    };
    // Create a New Order
    OrderTable.prototype.create = function (order, pid, q) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, Wrappers_1.tryCatchWrap)('Could not Create Order', function () { return __awaiter(_this, void 0, void 0, function () {
                        var sql_order, results_order, oid, sql_db, sql_show, results;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    sql_order = "INSERT INTO orders(user_id, status, date)\n                         VALUES ('".concat(order.uid, "', '").concat(order.status, "', '").concat(order.date, "')\n                         RETURNING *");
                                    return [4 /*yield*/, (0, helpers_1.connectQuery)(sql_order, db_1.client)];
                                case 1:
                                    results_order = _a.sent();
                                    console.log(results_order);
                                    oid = results_order.rows[0].id;
                                    sql_db = "INSERT INTO order_product(order_id, prod_id, quantity)\n                      VALUES ('".concat(oid, "', '").concat(pid, "', '").concat(q, "')\n                      RETURNING *");
                                    return [4 /*yield*/, (0, helpers_1.connectQuery)(sql_db, db_1.client)];
                                case 2:
                                    _a.sent();
                                    sql_show = "SELECT users.firstname,\n                               users.lastname,\n                               products.name,\n                               products.price,\n                               products.category,\n                               orders.status,\n                               orders.date,\n                               orders.id,\n                               quantity\n                        FROM orders\n                                 JOIN order_product ON orders.id = order_product.order_id\n                                 JOIN products ON products.id = order_product.prod_id\n                                 JOIN users ON orders.user_id = users.id";
                                    return [4 /*yield*/, (0, helpers_1.connectQuery)(sql_show, db_1.client)];
                                case 3:
                                    results = _a.sent();
                                    return [2 /*return*/, results.rows[0]];
                            }
                        });
                    }); })];
            });
        });
    };
    // Delete Existing Order using oid
    OrderTable.prototype.delete = function (oid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, Wrappers_1.tryCatchWrap)("Could not Create Order with id : ".concat(oid), function () { return __awaiter(_this, void 0, void 0, function () {
                        var sql, results;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    sql = "DELETE FROM orders WHERE id=".concat(oid, " RETURNING *");
                                    return [4 /*yield*/, (0, helpers_1.connectQuery)(sql, db_1.client)];
                                case 1:
                                    results = _a.sent();
                                    return [2 /*return*/, results.rows[0]];
                            }
                        });
                    }); })];
            });
        });
    };
    // Search an Order by ID
    OrderTable.prototype.search = function (oid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, Wrappers_1.tryCatchWrap)("Could not Find Order with ID: ".concat(oid), function () { return __awaiter(_this, void 0, void 0, function () {
                        var sql, results;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    sql = "SELECT users.firstname,\n                          users.lastname,\n                          users.id as uid,\n                          products.name,\n                          products.price,\n                          products.category,\n                          orders.status,\n                          orders.date,\n                          quantity\n                   FROM orders\n                            JOIN order_product ON orders.id = order_product.order_id\n                            JOIN products ON products.id = order_product.prod_id\n                            JOIN users ON orders.user_id = users.id\n                   WHERE orders.id = ".concat(oid);
                                    return [4 /*yield*/, (0, helpers_1.connectQuery)(sql, db_1.client)];
                                case 1:
                                    results = _a.sent();
                                    return [2 /*return*/, results.rows[0]];
                            }
                        });
                    }); })];
            });
        });
    };
    // Get Order by Current User
    OrderTable.prototype.getOrder = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, Wrappers_1.tryCatchWrap)('Could Not get Orders for User', function () { return __awaiter(_this, void 0, void 0, function () {
                        var sql, results;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    sql = "SELECT users.firstname,\n                          users.lastname,\n                          users.id as uid,\n                          products.name,\n                          products.price,\n                          products.category,\n                          orders.status,\n                          orders.date,\n                          quantity\n                   FROM orders\n                            JOIN order_product ON orders.id = order_product.order_id\n                            JOIN products ON products.id = order_product.prod_id\n                            JOIN users ON orders.user_id = users.id\n                   WHERE users.id = ".concat(uid);
                                    return [4 /*yield*/, (0, helpers_1.connectQuery)(sql, db_1.client)];
                                case 1:
                                    results = _a.sent();
                                    return [2 /*return*/, results.rows];
                            }
                        });
                    }); })];
            });
        });
    };
    return OrderTable;
}());
exports.OrderTable = OrderTable;
