"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, RDS_HOSTNAME = _a.RDS_HOSTNAME, RDS_PORT = _a.RDS_PORT, RDS_DB_NAME = _a.RDS_DB_NAME, RDS_DB_NAME_TEST = _a.RDS_DB_NAME_TEST, RDS_USERNAME = _a.RDS_USERNAME, RDS_PASSWORD = _a.RDS_PASSWORD, ENV = _a.ENV;
var client;
exports.client = client;
console.log("Connecting to ".concat(ENV, " DB ..."));
switch (ENV) {
    case 'dev':
        exports.client = client = new pg_1.Pool({
            host: RDS_HOSTNAME,
            port: Number(RDS_PORT),
            database: RDS_DB_NAME,
            user: RDS_USERNAME,
            password: RDS_PASSWORD
        });
        break;
    case 'test':
        exports.client = client = new pg_1.Pool({
            host: RDS_HOSTNAME,
            port: Number(RDS_PORT),
            database: RDS_DB_NAME_TEST,
            user: RDS_USERNAME,
            password: RDS_PASSWORD
        });
        break;
}
