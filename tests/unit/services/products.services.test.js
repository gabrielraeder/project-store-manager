const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service');

const productMocks = require('./mocks/products.mock');

describe(' SERVICE - PRODUCTS', function () {
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

      const result = await productService.insert(data);
      expect(result).to.deep.equal({ type: null, message: product });
    });

    it('Erro ao adicionar novo produto', async function () {
      const data = { name: 'p' }
      const error = { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };

      const result = await productService.insert(data);
      expect(result).to.deep.equal(error);
    });
  });

  describe('Rota PUT', function () {
    beforeEach(sinon.restore);
    it('Testa atualizar um produto com sucesso', async function () {
      const obj = { id: 1, name: 'batman' };
      sinon.stub(productModel, 'update').resolves({ affectedRows: 1 });

      const result = await productService.update(obj.id, obj.name);
        
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(obj);
    });

    it('Testa atualizar um produto com nome inválido', async function () {
      const obj = { id: 1, name: 'bat' };

      const result = await productService.update(obj.id, obj.name);
        
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
    });

    it('Testa atualizar um produto com ID inválido', async function () {
      const obj = { id: 555, name: 'batman' };
      sinon.stub(productModel, 'update').resolves({ affectedRows: 0 });

      const result = await productService.update(obj.id, obj.name);
        
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  describe('Rota DELETE', function () {
    beforeEach(sinon.restore);
    it('Testa remover um produto com sucesso', async function () {
      sinon.stub(productModel, 'remove').resolves({ affectedRows: 1 });

      const result = await productService.remove(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 1 });
    });

    it('Falha ao remover um produto', async function () {
      sinon.stub(productModel, 'remove').resolves({ affectedRows: 0 });

      const result = await productService.remove(555);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });
});