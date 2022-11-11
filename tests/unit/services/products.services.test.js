const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service');

const productMocks = require('./mocks/products.mock');

describe('Testa camada SERVICE de rotas products', function () {
  describe('rotas GET', function () {
    beforeEach(sinon.restore);
    it('teste buscar todos produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(productMocks.findAllProducts);

      const result = await productService.findAll();

      expect(result).to.deep.equal({ type: null, message: productMocks.findAllProducts });
    });

    it('teste buscar produto por id com sucesso', async function () {
      sinon.stub(productModel, 'findById').resolves(productMocks.successFindById);

      const result = await productService.findById(1);

      expect(result).to.deep.equal({ type: null, message: productMocks.successFindById });
    });

    it('teste buscar produto por id com falha', async function () {
      sinon.stub(productModel, 'findById').resolves();

      const result = await productService.findById(1);

      expect(result).to.deep.equal(productMocks.failureFindById);
    });
  });
});