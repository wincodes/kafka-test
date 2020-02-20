const server = require('../index');
const { describe, it } = require('mocha');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http')
chai.use(chaiHttp);

describe('Basic Test', () => {
  it('it should return a 200 status', async () => {
    const req = await chai.request(server).get('/');

    assert.equal(req.status, 200);
  })

  it('it should return Hello World', async () => {
    const req = await chai.request(server).get('/');

    assert.equal(req.body, 'Hello World');
  })
})