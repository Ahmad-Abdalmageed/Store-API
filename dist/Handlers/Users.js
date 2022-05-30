'use strict';
var __importDefault = (this && this.__importDefault) || function(mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.usersRouter = void 0;
var express_1 = __importDefault(require('express'));
var Users_1 = require('../Controllers/Users');
var usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
// Users Routes
usersRouter.route('/login/').get(Users_1.signIn);
usersRouter.route('/:uid').get(Users_1.search).delete(Users_1.erase);
usersRouter.route('/').get(Users_1.index).post(Users_1.create);
