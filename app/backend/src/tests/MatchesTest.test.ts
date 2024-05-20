import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import { arrayMatchesMock } from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  it('should return all matches', async function() {
    sinon.stub(SequelizeMatchesModel, 'findAll').resolves(arrayMatchesMock as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.eql(arrayMatchesMock);
    expect(body).to.be.an('array');
  })
afterEach(sinon.restore);
});