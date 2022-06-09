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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../Models/User");
var Product_1 = require("../Models/Product");
var Order_1 = require("../Models/Order");
var bcrypt_1 = __importDefault(require("bcrypt"));
// User Table Testing
describe('User Table Model Testing::', function () {
    var users = new User_1.UserTable();
    it('Should have a listAll Method', function () {
        expect(users.listAll).toBeDefined();
    });
    it('Should have a Create Method', function () {
        expect(users.create).toBeDefined();
    });
    it('Should have a delete Method', function () {
        expect(users.delUser).toBeDefined();
    });
    it('Should have a Search Method', function () {
        expect(users.getUser).toBeDefined();
    });
    it('Should have a Sign In Method', function () {
        expect(users.auth).toBeDefined();
    });
    it('Creates a User', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newUser = {
                        username: 'st_123',
                        firstname: 'Store',
                        lastname: 'API',
                        password: 'store_api'
                    };
                    return [4 /*yield*/, users.create(newUser)];
                case 1:
                    res = _a.sent();
                    expect(res).toEqual({
                        id: 3,
                        username: 'st_123',
                        firstname: 'Store',
                        lastname: 'API',
                        password: 'store_api'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('Lists all Users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users.listAll()];
                case 1:
                    res = _a.sent();
                    expect(res).toEqual([
                        {
                            id: 3,
                            username: 'st_123',
                            firstname: 'Store',
                            lastname: 'API',
                            password: 'store_api'
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Gets a User', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users.getUser(3)];
                case 1:
                    res = _a.sent();
                    expect(res.username).toEqual('st_123');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Authenticate a User', function () { return __awaiter(void 0, void 0, void 0, function () {
        var passHash, newUser, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    passHash = bcrypt_1.default.hashSync('store_api' + process.env.BCRYPT_PASSWORD, Number(process.env.SALT_ROUNDS));
                    newUser = {
                        username: 'st_234',
                        firstname: 'Store',
                        lastname: 'API',
                        password: passHash
                    };
                    return [4 /*yield*/, users.create(newUser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, users.auth('st_234', 'store_api')];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, users.delUser(4)];
                case 3:
                    _a.sent();
                    expect(res === null || res === void 0 ? void 0 : res.username).toEqual('st_234');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deletes a User', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users.delUser(3)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, users.getUser(3)];
                case 2:
                    res = _a.sent();
                    expect(res).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
// Products Table Testing
describe('Products Table Model Testing:: ', function () {
    var prods = new Product_1.ProductTable();
    it('Should have a listAll Method', function () {
        expect(prods.listAll).toBeDefined();
    });
    it('Should have a Create Method', function () {
        expect(prods.create).toBeDefined();
    });
    it('Should have a delete Method', function () {
        expect(prods.delete).toBeDefined();
    });
    it('Should have a Search Method', function () {
        expect(prods.getProduct).toBeDefined();
    });
    it('Creates a Product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newProd, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newProd = {
                        name: 'Watch',
                        price: 200,
                        category: 'Wearables'
                    };
                    return [4 /*yield*/, prods.create(newProd)];
                case 1:
                    res = _a.sent();
                    expect(res).toEqual({
                        id: 3,
                        name: 'Watch',
                        price: 200,
                        category: 'Wearables'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('Lists all Products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prods.listAll()];
                case 1:
                    res = _a.sent();
                    expect(res).toEqual([
                        {
                            id: 3,
                            name: 'Watch',
                            price: 200,
                            category: 'Wearables'
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Gets a Product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prods.getProduct(3)];
                case 1:
                    res = _a.sent();
                    expect(res).toEqual({
                        id: 3,
                        name: 'Watch',
                        price: 200,
                        category: 'Wearables'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deletes a Product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prods.delete(3)];
                case 1:
                    res = _a.sent();
                    expect(res).toEqual({
                        id: 3,
                        name: 'Watch',
                        price: 200,
                        category: 'Wearables'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
// Orders Table Testing
describe('Orders Table Model Testing', function () {
    var users = new User_1.UserTable();
    var prods = new Product_1.ProductTable();
    var orders = new Order_1.OrderTable();
    it('Should have a listAll Method', function () {
        expect(orders.listAll).toBeDefined();
    });
    it('Should have a Create Method', function () {
        expect(orders.create).toBeDefined();
    });
    it('Should have a delete Method', function () {
        expect(orders.delete).toBeDefined();
    });
    it('Should have a Search Method', function () {
        expect(orders.search).toBeDefined();
    });
    it("Should have a Get User's Order Method", function () {
        expect(orders.getOrder).toBeDefined();
    });
    it('Should Create an Order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var today, date, time, newUser, user, newProd, prod, newOrder, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date();
                    date = today.getFullYear() +
                        '-' +
                        (today.getMonth() + 1) +
                        '-' +
                        today.getDate();
                    time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                    newUser = {
                        username: 'st_123',
                        firstname: 'Store',
                        lastname: 'API',
                        password: 'store_api'
                    };
                    return [4 /*yield*/, users.create(newUser)];
                case 1:
                    user = _a.sent();
                    newProd = {
                        name: 'Watch',
                        price: 200,
                        category: 'Wearables'
                    };
                    return [4 /*yield*/, prods.create(newProd)];
                case 2:
                    prod = _a.sent();
                    newOrder = {
                        uid: user.id,
                        status: 'Pending',
                        date: "".concat(date, " ").concat(time)
                    };
                    return [4 /*yield*/, orders.create(newOrder, Number(prod.id), 2)];
                case 3:
                    res = _a.sent();
                    console.log('The ', res.date);
                    expect(res).toEqual({
                        firstname: 'Store',
                        lastname: 'API',
                        name: 'Watch',
                        price: 200,
                        category: 'Wearables',
                        status: 'Pending',
                        date: new Date(),
                        id: 2,
                        quantity: 2
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
