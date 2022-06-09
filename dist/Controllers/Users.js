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
exports.signIn = exports.search = exports.erase = exports.create = exports.index = void 0;
var User_1 = require("../Models/User");
var Wrappers_1 = require("../Middleware/Wrappers");
var apiError_1 = require("../Errors/apiError");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var users = new User_1.UserTable();
var tokenSecret = process.env.TOKEN_SECRET;
// Return All Users Route Controller
var index = (0, Wrappers_1.tryCatchWrapExpress)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users.listAll()];
            case 1:
                results = _a.sent();
                if (!results || results.length == 0)
                    return [2 /*return*/, next(new apiError_1.apiError(204, 'No Users Found'))];
                res.status(200).json(results);
                return [2 /*return*/];
        }
    });
}); });
exports.index = index;
// Create new User
var create = (0, Wrappers_1.tryCatchWrapExpress)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var passHash, newUser, results, tokenSecret, user_token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                passHash = bcrypt_1.default.hashSync(req.body.pass + process.env.BCRYPT_PASSWORD, Number(process.env.SALT_ROUNDS));
                newUser = {
                    username: req.body.uname,
                    firstname: req.body.fname,
                    lastname: req.body.lname,
                    password: passHash
                };
                return [4 /*yield*/, users.create(newUser)];
            case 1:
                results = _a.sent();
                tokenSecret = process.env.TOKEN_SECRET;
                user_token = jsonwebtoken_1.default.sign({ user: results }, tokenSecret);
                res.status(200).json(user_token);
                return [2 /*return*/];
        }
    });
}); });
exports.create = create;
// Search with User ID
var search = (0, Wrappers_1.tryCatchWrapExpress)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users.getUser(Number(req.params.uid))];
            case 1:
                results = _a.sent();
                // No User found with ID
                if (!results)
                    return [2 /*return*/, next(new apiError_1.apiError(204, 'User could not be found'))];
                res.status(200).json(results);
                return [2 /*return*/];
        }
    });
}); });
exports.search = search;
// Delete User
var erase = (0, Wrappers_1.tryCatchWrapExpress)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, foundUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uid = Number(req.params.uid);
                return [4 /*yield*/, users.getUser(uid)];
            case 1:
                foundUser = _a.sent();
                if (!foundUser)
                    return [2 /*return*/, next(new apiError_1.apiError(204, "User with ID: ".concat(uid, " is not Found")))];
                return [4 /*yield*/, users.delUser(uid)];
            case 2:
                results = _a.sent();
                res.status(200).json(results);
                return [2 /*return*/];
        }
    });
}); });
exports.erase = erase;
var signIn = (0, Wrappers_1.tryCatchWrapExpress)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, authenticated, user_token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    username: req.body.uname,
                    pass: req.body.pass
                };
                return [4 /*yield*/, users.auth(user.username, user.pass)];
            case 1:
                authenticated = _a.sent();
                user_token = jsonwebtoken_1.default.sign({ user: authenticated }, tokenSecret);
                if (!authenticated)
                    return [2 /*return*/, next(new apiError_1.apiError(401, 'username/password are not correct'))];
                res.status(200).json(user_token);
                return [2 /*return*/];
        }
    });
}); });
exports.signIn = signIn;
