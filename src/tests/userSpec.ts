import { UserTable } from '../Models/User';

// User Table Testing
describe('User Table Model Testing', () => {
  const users = new UserTable();
  it('Should have a listAll Method', () => {
    expect(users.listAll).toBeDefined();
  });
});
