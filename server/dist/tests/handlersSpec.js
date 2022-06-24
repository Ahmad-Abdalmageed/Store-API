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
var server_1 = require("../server");
var supertest_1 = __importDefault(require("supertest"));
var request = (0, supertest_1.default)(server_1.app);
var url = '/api/v1/store/';
var token;
describe('Store API Endpoint Testing -- Users', function () {
    it('Returns a 401 Response, Not Authorized', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get(url + 'users/')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Returns a 204 Response, Authorized with No content', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(url + 'users/')
                        .set({ authorization: 'bear Admin' })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(204);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Creates a User', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(url + 'users/').send({
                        uname: 'store_api_admin',
                        fname: 'store',
                        lname: 'api',
                        pass: 'store_api_pass'
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Search User Returns a 200 Response', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get(url + 'users/1')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deleting a User without Auth Returns a 401', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.delete(url + 'users/1')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Signing in a User', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get(url + 'users/login/').send({
                        uname: 'store_api_admin',
                        pass: 'store_api_pass'
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deleting a User with Auth Returns a 200', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(url + 'users/1')
                        .set({ authorization: 'bear Admin' })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Store API Endpoint Testing -- Products', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('Returns a 204 Response, No content', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get(url + 'products/')];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(204);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Creates a Product with Auth', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post(url + 'products/')
                            .send({
                            name: 'Watch',
                            price: 20,
                            category: 'Wearables'
                        })
                            .set({ authorization: 'bear Admin' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Searches a Product with ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get(url + 'products/1')];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Deletes a Products without Auth', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.delete(url + 'products/1')];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Deletes a Products with Auth', function () { return __awaiter(void 0, void 0, void 0, function () {
            var body, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post(url + 'users/').send({
                            uname: 'store_api_admin',
                            fname: 'store',
                            lname: 'api',
                            pass: 'store_api_pass'
                        })];
                    case 1:
                        body = (_a.sent()).body;
                        token = body;
                        return [4 /*yield*/, request.get(url + 'users/login/').send({
                                uname: 'store_api_admin',
                                pass: 'store_api_pass'
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, request
                                .delete(url + 'products/1')
                                .set({ authorization: "bear ".concat(token) })];
                    case 3:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
describe('Store API Endpoint Testing -- Orders', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('Index Returns a 204 No Contents Found, with Auth', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get(url + 'orders/')
                            .set({ authorization: 'bear Admin' })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(204);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Index Returns a 401 Not Authenticated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get(url + 'orders/')];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Index Returns a 401 Non Admin Access', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get(url + 'orders/')
                            .set({ authorization: "bear ".concat(token) })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Creates an Order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var today, date, time, newProd, res;
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
                        return [4 /*yield*/, request
                                .post(url + 'products/')
                                .send({
                                name: 'Watch',
                                price: 20,
                                category: 'Wearables'
                            })
                                .set({ authorization: 'bear Admin' })];
                    case 1:
                        newProd = _a.sent();
                        return [4 /*yield*/, request
                                .post(url + 'orders/')
                                .send({
                                uid: 2,
                                os: 'Pending',
                                date: "".concat(date, " ").concat(time),
                                pid: newProd.body.id,
                                quantity: 2
                            })
                                .set({ authorization: "bear ".concat(token) })];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Get User's Orders", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get(url + 'orders/users/2')
                            .set({ authorization: "bear ".concat(token) })];
                    case 1:
                        res = _a.sent();
                        // Deletes this User for Further Testing
                        return [4 /*yield*/, request.delete(url + 'users/2').set({ authorization: 'bear Admin' })];
                    case 2:
                        // Deletes this User for Further Testing
                        _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Get User's Order , Different User", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get(url + 'orders/users/1')
                            .set({ authorization: "bear ".concat(token) })];
                    case 1:
                        res = _a.sent();
                        // Removes this Product for further testing
                        return [4 /*yield*/, request
                                .delete(url + 'products/2')
                                .set({ authorization: 'bear Admin' })];
                    case 2:
                        // Removes this Product for further testing
                        _a.sent();
                        expect(res.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
