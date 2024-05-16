import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUserModel from '../database/models/SequelizeUserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', () => {
  it('should return a token', async function() {
    const user = {
      email: 'user@user.com',
      password: 'secret_user',
  };

  const dbData = {
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  }
    sinon.stub(SequelizeUserModel, 'findOne').resolves(dbData as any);

    const { status, body } = await chai.request(app).post('/login').send(user);
    console.log(status, body);
    

    expect(status).to.be.equal(200);
    expect(body).to.have.property('token');
  });
  it('should return a 401 status', async function() {
    const user = {
      email: 'user@user.com',
      password: 'senha_errada'
    };

    const dbData = {
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    }

    sinon.stub(SequelizeUserModel, 'findOne').resolves(dbData as any);

    const { status, body } = await chai.request(app).post('/login').send(user);

    expect(status).to.be.equal(401);
    expect(body).to.have.property('message');
    expect(body.message).to.be.equal('Invalid email or password');
  });
  it('should return a 400 status', async function() {
    const user = {
      email: 'user@user.com'
    };

    const dbData = {
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    }

    sinon.stub(SequelizeUserModel, 'findOne').resolves(dbData as any);

    const { status, body } = await chai.request(app).post('/login').send(user);

    expect(status).to.be.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.equal('All fields must be filled');
  });
  it('should return a 400 status Email Invalid', async function() {
    const user = {
      email: 'user@user.c',
      password: 'secret_user'
    };

    const dbData = {
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    }

    sinon.stub(SequelizeUserModel, 'findOne').resolves(dbData as any);

    const { status, body } = await chai.request(app).post('/login').send(user);

    expect(status).to.be.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.equal('Invalid email');
  });
  it('should return a 400 status Password Invalid', async function() {
    const user = {
      email: 'user@user.com',
      password: 'secr'
    };

    const dbData = {
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    }

    sinon.stub(SequelizeUserModel, 'findOne').resolves(dbData as any);

    const { status, body } = await chai.request(app).post('/login').send(user);

    expect(status).to.be.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.be.equal('Password must be at least 6 characters');
  });
  afterEach(sinon.restore);
});