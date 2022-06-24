import { app } from '../server';
import supertest from 'supertest';

const request = supertest(app);
const url = '/api/v1/store/';
let token: string;

describe('Store API Endpoint Testing -- Users', () => {
  it('Returns a 401 Response, Not Authorized', async () => {
    const res = await request.get(url + 'users/');
    expect(res.status).toBe(401);
  });
  it('Returns a 204 Response, Authorized with No content', async () => {
    const res = await request
      .get(url + 'users/')
      .set({ authorization: 'bear Admin' });
    expect(res.status).toBe(204);
  });
  it('Creates a User', async () => {
    const res = await request.post(url + 'users/').send({
      uname: 'store_api_admin',
      fname: 'store',
      lname: 'api',
      pass: 'store_api_pass'
    });
    expect(res.status).toBe(200);
  });
  it('Search User Returns a 200 Response', async () => {
    const res = await request.get(url + 'users/1');
    expect(res.status).toBe(200);
  });
  it('Deleting a User without Auth Returns a 401', async () => {
    const res = await request.delete(url + 'users/1');
    expect(res.status).toBe(401);
  });
  it('Signing in a User', async () => {
    const res = await request.get(url + 'users/login/').send({
      uname: 'store_api_admin',
      pass: 'store_api_pass'
    });
    expect(res.status).toBe(200);
  });
  it('Deleting a User with Auth Returns a 200', async () => {
    const res = await request
      .delete(url + 'users/1')
      .set({ authorization: 'bear Admin' });
    expect(res.status).toBe(200);
  });
});

describe('Store API Endpoint Testing -- Products', async () => {
  it('Returns a 204 Response, No content', async () => {
    const res = await request.get(url + 'products/');
    expect(res.status).toBe(204);
  });
  it('Creates a Product with Auth', async () => {
    const res = await request
      .post(url + 'products/')
      .send({
        name: 'Watch',
        price: 20,
        category: 'Wearables'
      })
      .set({ authorization: 'bear Admin' });
    expect(res.status).toBe(200);
  });
  it('Searches a Product with ID', async () => {
    const res = await request.get(url + 'products/1');
    expect(res.status).toBe(200);
  });
  it('Deletes a Products without Auth', async () => {
    const res = await request.delete(url + 'products/1');
    expect(res.status).toBe(401);
  });
  it('Deletes a Products with Auth', async () => {
    const { body } = await request.post(url + 'users/').send({
      uname: 'store_api_admin',
      fname: 'store',
      lname: 'api',
      pass: 'store_api_pass'
    });
    token = body;
    await request.get(url + 'users/login/').send({
      uname: 'store_api_admin',
      pass: 'store_api_pass'
    });
    const res = await request
      .delete(url + 'products/1')
      .set({ authorization: `bear ${token}` });
    expect(res.status).toBe(200);
  });
});

describe('Store API Endpoint Testing -- Orders', async () => {
  it('Index Returns a 204 No Contents Found, with Auth', async () => {
    const res = await request
      .get(url + 'orders/')
      .set({ authorization: 'bear Admin' });
    expect(res.status).toBe(204);
  });
  it('Index Returns a 401 Not Authenticated', async () => {
    const res = await request.get(url + 'orders/');
    expect(res.status).toBe(401);
  });
  it('Index Returns a 401 Non Admin Access', async () => {
    const res = await request
      .get(url + 'orders/')
      .set({ authorization: `bear ${token}` });
    expect(res.status).toBe(401);
  });
  it('Creates an Order', async () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const newProd = await request
      .post(url + 'products/')
      .send({
        name: 'Watch',
        price: 20,
        category: 'Wearables'
      })
      .set({ authorization: 'bear Admin' });

    const res = await request
      .post(url + 'orders/')
      .send({
        uid: 2,
        os: 'Pending',
        date: `${date} ${time}`,
        pid: newProd.body.id,
        quantity: 2
      })
      .set({ authorization: `bear ${token}` });

    expect(res.status).toBe(200);
  });
  it("Get User's Orders", async () => {
    const res = await request
      .get(url + 'orders/users/2')
      .set({ authorization: `bear ${token}` });

    // Deletes this User for Further Testing
    await request.delete(url + 'users/2').set({ authorization: 'bear Admin' });
    expect(res.status).toBe(200);
  });
  it("Get User's Order , Different User", async () => {
    const res = await request
      .get(url + 'orders/users/1')
      .set({ authorization: `bear ${token}` });

    // Removes this Product for further testing
    await request
      .delete(url + 'products/2')
      .set({ authorization: 'bear Admin' });
    expect(res.status).toBe(401);
  });
});
