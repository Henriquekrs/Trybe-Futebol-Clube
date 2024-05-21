import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import { arrayMatchesMock, matchesInProgressMock, matchesMockFalse, matchesMockTrue } from './mocks/matchesMock';
import jwtSecret from '../config/jwtConfig';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  const validToken = jwt.sign( { email: 'user@user.com' } , jwtSecret, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

  it('should return all matches', async function() {
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(arrayMatchesMock as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.eql(arrayMatchesMock);
    expect(body).to.be.an('array');
  })
  it('should return all matches in progress', async function() {
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(matchesInProgressMock as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.be.eql(matchesInProgressMock);
    expect(body).to.be.an('array');
    const matchesInProgress = body.every((match: any) => match.inProgress === true);
    expect(matchesInProgress).to.be.true;
  });
  it('should finish match', async function() {

    sinon.stub(SequelizeMatchesModel, 'findByPk').resolves(matchesMockTrue as any);
    sinon.stub(SequelizeMatchesModel, 'update').resolves(matchesMockFalse as any);

    const { status, body } = await chai.request(app)
    .patch('/matches/48/finish')
    .set('Authorization', `Bearer ${validToken}`);;

    expect(status).to.be.equal(200);
    expect(body).to.have.property('message');
    expect(body.message).to.be.equal('Finished');
  });
  it('should return status 200 and message Gool', async function() {
    const match = {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }

    sinon.stub(SequelizeMatchesModel, 'findByPk').resolves(matchesMockTrue as any);
    sinon.stub(SequelizeMatchesModel, 'update').resolves(matchesMockTrue as any);
    
    const { status, body } = await chai.request(app)
    .patch('/matches/48')
    .set('Authorization', `Bearer ${validToken}`)
    .send(match);
    
    expect(status).to.be.equal(200);
    expect(body).to.have.property('message');
    expect(body.message).to.be.equal('Goool');
  });
afterEach(sinon.restore);
});