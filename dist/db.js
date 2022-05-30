'use strict';
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.client = void 0;
var dotenv_1 = __importDefault(require('dotenv'));
var pg_1 = require('pg');
dotenv_1.default.config();
var client;
exports.client = client;
switch (process.env.ENV) {
    case 'dev':
        exports.client = client = new pg_1.Pool({
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD
        });
        break;
    case 'test':
        exports.client = client = new pg_1.Pool({
            host: process.env.POSTGRES_HOST,
            database: ''.concat(process.env.POSTGRES_DB, '_test'),
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD
        });
        break;
}
