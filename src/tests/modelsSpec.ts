import { UserTable, User } from '../Models/User';
import { Product, ProductTable } from '../Models/Product';
import { Order, OrderTable } from '../Models/Order';
import bcrypt from 'bcrypt';

// User Table Testing
describe('User Table Model Testing::', () => {
  const users = new UserTable();
  it('Should have a listAll Method', () => {
    expect(users.listAll).toBeDefined();
  });
  it('Should have a Create Method', () => {
    expect(users.create).toBeDefined();
  });
  it('Should have a delete Method', () => {
    expect(users.delUser).toBeDefined();
  });
  it('Should have a Search Method', () => {
    expect(users.getUser).toBeDefined();
  });
  it('Should have a Sign In Method', () => {
    expect(users.auth).toBeDefined();
  });
  it('Creates a User', async () => {
    const newUser: User = {
      username: 'st_123',
      firstname: 'Store',
      lastname: 'API',
      password: 'store_api'
    };
    const res = await users.create(newUser);
    expect(res).toEqual({
      id: 3,
      username: 'st_123',
      firstname: 'Store',
      lastname: 'API',
      password: 'store_api'
    });
  });
  it('Lists all Users', async () => {
    const res = await users.listAll();
    expect(res).toEqual([
      {
        id: 3,
        username: 'st_123',
        firstname: 'Store',
        lastname: 'API',
        password: 'store_api'
      }
    ]);
  });
  it('Gets a User', async () => {
    const res = await users.getUser(3);
    expect(res.username).toEqual('st_123');
  });
  it('Authenticate a User', async () => {
    const passHash = bcrypt.hashSync(
      'store_api' + process.env.BCRYPT_PASSWORD,
      Number(process.env.SALT_ROUNDS)
    );
    const newUser: User = {
      username: 'st_234',
      firstname: 'Store',
      lastname: 'API',
      password: passHash
    };
    await users.create(newUser);
    const res = await users.auth('st_234', 'store_api');
    await users.delUser(4);
    expect(res?.username).toEqual('st_234');
  });
  it('Deletes a User', async () => {
    await users.delUser(3);
    const res = await users.getUser(3);
    expect(res).toBeUndefined();
  });
});

// Products Table Testing
describe('Products Table Model Testing:: ', () => {
  const prods = new ProductTable();
  it('Should have a listAll Method', () => {
    expect(prods.listAll).toBeDefined();
  });
  it('Should have a Create Method', () => {
    expect(prods.create).toBeDefined();
  });
  it('Should have a delete Method', () => {
    expect(prods.delete).toBeDefined();
  });
  it('Should have a Search Method', () => {
    expect(prods.getProduct).toBeDefined();
  });
  it('Creates a Product', async () => {
    const newProd: Product = {
      name: 'Watch',
      price: 200,
      category: 'Wearables'
    };
    const res = await prods.create(newProd);
    expect(res).toEqual({
      id: 3,
      name: 'Watch',
      price: 200,
      category: 'Wearables'
    });
  });
  it('Lists all Products', async () => {
    const res = await prods.listAll();
    expect(res).toEqual([
      {
        id: 3,
        name: 'Watch',
        price: 200,
        category: 'Wearables'
      }
    ]);
  });
  it('Gets a Product', async () => {
    const res = await prods.getProduct(3);
    expect(res).toEqual({
      id: 3,
      name: 'Watch',
      price: 200,
      category: 'Wearables'
    });
  });
  it('Deletes a Product', async () => {
    const res = await prods.delete(3);
    expect(res).toEqual({
      id: 3,
      name: 'Watch',
      price: 200,
      category: 'Wearables'
    });
  });
});

// Orders Table Testing
describe('Orders Table Model Testing', () => {
  const users = new UserTable();
  const prods = new ProductTable();
  const orders = new OrderTable();
  it('Should have a listAll Method', () => {
    expect(orders.listAll).toBeDefined();
  });
  it('Should have a Create Method', () => {
    expect(orders.create).toBeDefined();
  });
  it('Should have a delete Method', () => {
    expect(orders.delete).toBeDefined();
  });
  it('Should have a Search Method', () => {
    expect(orders.search).toBeDefined();
  });
  it("Should have a Get User's Order Method", () => {
    expect(orders.getOrder).toBeDefined();
  });
  it('Should Create an Order', async () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const newUser: User = {
      username: 'st_123',
      firstname: 'Store',
      lastname: 'API',
      password: 'store_api'
    };
    const user = await users.create(newUser);

    const newProd: Product = {
      name: 'Watch',
      price: 200,
      category: 'Wearables'
    };
    const prod = await prods.create(newProd);
    const newOrder: Order = {
      uid: user.id,
      status: 'Pending',
      date: `${date} ${time}`
    };

    const res = await orders.create(newOrder, Number(prod.id), 2);

    expect(res.id).toEqual(2);
  });
  it('Should Delete an Order', async () => {
    const res = await orders.delete(2);
    expect(res.id).toEqual(2);
  });
  it('Should List all Orders', async () => {
    const res = await orders.listAll();
    expect(res).toEqual([]);
  });
});
