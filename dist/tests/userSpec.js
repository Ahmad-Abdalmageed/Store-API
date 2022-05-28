'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var User_1 = require('../Models/User');
// User Table Testing
describe('User Table Model Testing', function() {
  var users = new User_1.UserTable();
  it('Should have a listAll Method', function() {
    expect(users.listAll).toBeDefined();
  });
});
