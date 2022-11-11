const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/products.model');

const productMocks = require('./mocks/products.mock');

describe('Testa camada Model de rotas products', function () {
  describe('rotas GET', function () {
    beforeEach(sinon.restore);
    it('teste buscar todos produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productMocks.findAllProducts]);

      const result = await productModel.findAll();
      expect(result).to.be.a('array');
      expect(result).to.be.deep.equal(productMocks.findAllProducts);
    });

    it('teste buscar produto por id com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([[productMocks.successFindById]]);

      const result = await productModel.findById(1);
      expect(result).to.be.a('object');
      expect(result).to.be.deep.equal(productMocks.successFindById);
    });

    it('teste buscar produto por id com falha', async function () {
      sinon.stub(connection, 'execute').resolves([[productMocks.failureFindById]]);

      const result = await productModel.findById(1);
      expect(result).to.be.a('object');
      expect(result).to.be.deep.equal(productMocks.failureFindById);
    });
  });
});