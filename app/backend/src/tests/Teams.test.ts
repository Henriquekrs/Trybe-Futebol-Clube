import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import { teamsMock } from './mocks/teamMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team Tets', () => {
  it('should return all books', async function() {
    sinon.stub(SequelizeTeamModel, 'findAll').resolves(teamsMock as any)

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teamsMock);
  });
  afterEach(sinon.restore);
});
