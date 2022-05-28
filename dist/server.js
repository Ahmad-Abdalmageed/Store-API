'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.app = void 0;
var express_1 = __importDefault(require('express'));
var Users_1 = require('./Handlers/Users');
var Products_1 = require('./Handlers/Products');
var errorHandler_1 = require('./Middleware/errorHandler');
var dotenv_1 = __importDefault(require('dotenv'));
var Orders_1 = require('./Handlers/Orders');
dotenv_1.default.config();
var app = (0, express_1.default)();
exports.app = app;
// Routes & Middlewares
app.use(express_1.default.json());
app.use('/api/v1/store/users', Users_1.usersRouter);
app.use('/api/v1/store/products', Products_1.prodRouter);
app.use('/api/v1/store/orders', Orders_1.orderRouter);
app.use(errorHandler_1.errorHandler);
// Server
var startServer = function(PORT) {
  try {
    app.listen(PORT, function() {
      console.log('Server Started on PORT '.concat(PORT));
    });
  } catch (err) {
    console.log(err);
  }
};
startServer(Number(process.env.PORT) || 3000);
