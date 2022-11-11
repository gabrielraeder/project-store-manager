const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service');
const validations = require('../../../src/services/validations/inputValidations');

const productMocks = require('./mocks/products.mock');

describe('Testa camada SERVICE de rotas products', function () {
  beforeEach(sinon.restore);
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
    it('teste buscar produto por id com falha no id', async function () {
      const error = { type: 'INVALID_VALUE', message: '"id" must be a number' };

      const result = await productService.findById('err');

      expect(result).to.deep.equal(error);
    });
  });

  describe('Rota POST', function () {
    beforeEach(sinon.restore);
    it('Testa adicionar novo produto com sucesso', async function () {
      const data = { name: 'produtoX' }
      const product = {
        id: 5,
        name: "produtoX"
      }

      sinon.stub(productModel, 'insert').resolves(product.id);
      sinon.stub(productModel, 'findById').resolves(product);
      sinon.stub(validations, 'validateInsertData').resolves();

      const result = await productService.insert(data);
      expect(result).to.deep.equal({ type: null, message: product });
    });

    it('Erro ao adicionar novo produto', async function () {
      const data = { name: 'p' }
      const error = { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };

      const result = await productService.insert(data);
      expect(result).to.deep.equal(error);
    });
  })
});