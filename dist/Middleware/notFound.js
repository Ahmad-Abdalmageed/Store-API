'use strict';
/*
  Not Found Response Middleware
*/
Object.defineProperty(exports, '__esModule', { value: true });
exports.notFound = void 0;
var notFound = function(req, res) {
  return res.status(404).send('Route Does not Exist');
};
exports.notFound = notFound;
