"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
var client;
exports.client = client;
console.log("Connecting to ".concat(ENV, " DB ..."));
switch (ENV) {
    case 'dev':
        exports.client = client = new pg_1.Pool({
            host: POSTGRES_HOST,
            database: POSTGRES_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD
        });
        break;
    case 'test':
        exports.client = client = new pg_1.Pool({
            host: POSTGRES_HOST,
            database: POSTGRES_DB_TEST,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD
        });
        break;
}
console.log('Connected !!');
