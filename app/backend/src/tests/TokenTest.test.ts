import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUserModel from '../database/models/SequelizeUserModel';
import * as jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwtConfig';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test for /login/role', () => {
  const validUser = {
    id: 1,
    username: 'user',
    role: 'admin',
    email: 'user@user.com',
    password: 'hashed_password',
  };

  const validToken = jwt.sign({ email: validUser.email }, jwtSecret, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

  it('should return 401 if no authorization header is present', async () => {
    const { status, body } = await chai.request(app).get('/login/role');
    expect(status).to.equal(401);
    expect(body).to.have.property('message', 'Token not found');
  });

  it('should return 401 if authorization type is not Bearer', async () => {
    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('Authorization', `Basic ${validToken}`);
    expect(status).to.equal(401);
    expect(body).to.have.property('message', 'Token must be a valid token');
  });

  it('should return 401 if token is invalid', async () => {
    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('Authorization', 'Bearer invalid_token');
    expect(status).to.equal(401);
    expect(body).to.have.property('message', 'Token must be a valid token');
  });

  it('should return 200 and the user role if token is valid', async () => {
    sinon.stub(SequelizeUserModel, 'findOne').resolves(validUser as any);

    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('Authorization', `Bearer ${validToken}`);

    expect(status).to.equal(200);
    expect(body).to.have.property('role', validUser.role);
  });
  afterEach(sinon.restore);
});