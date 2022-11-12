const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productController = require('../../../src/controllers/products.controller');
const productService = require('../../../src/services/products.service');

const productsMock = require('./mocks/products.mock');

describe('CONTROLLER - PRODUCTS', function () {
  describe('rotas GET', function () {
    beforeEach(sinon.restore);
    it('teste buscar todos produtos', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findAll').resolves({ type: null, message: productsMock.findAllProducts });

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith(productsMock.findAllProducts);
    });

    it('teste buscar produto por id com sucesso', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findById').resolves({ type: null, message: productsMock.successFindById });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith(productsMock.successFindById);
    });

    it('teste buscar produto por id com falha', async function () {
      const res = {};
      const req = {
        params: {
          id: 555,
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Rota POST', function () {
    beforeEach(sinon.restore);
    it('Testa adicionar novo produto com sucesso', async function () {
      const res = {};
      const req = {
        body: {
          name: 'projetoX',
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'insert').resolves({ type: null, message: productsMock.createdProduct });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);

      expect(res.json).to.have.been.calledWith(productsMock.createdProduct);
    });

    it('Erro ao adicionar novo produto', async function () {
      const res = {};
      const req = {
        body: {
          name: 'p',
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'insert').resolves(productsMock.creationFailure);

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);

      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Rota PUT', function () {
    beforeEach(sinon.restore);
    it('Testa atualizar um produto com sucesso', async function () {
      const res = {};
      const req = {
        body: {
          name: 'batman',
        },
        params: {
          id: 1,
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'update').resolves({ type: null, message: productsMock.updatedProduct });

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith(productsMock.updatedProduct);
    });

    it('Testa atualizar um produto com erro no ID', async function () {
      const res = {};
      const req = {
        body: {
          name: 'batman',
        },
        params: {
          id: 555,
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'update').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Testa atualizar um produto com erro no ID', async function () {
      const res = {};
      const req = {
        body: {
          name: 'bat',
        },
        params: {
          id: 1,
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'update').resolves(
        { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' }
      );

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(422);

      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Rota DELETE', function () {
    beforeEach(sinon.restore);
    it('Testa remover um produto com sucesso', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'remove').resolves({ type: null, message: { id: 1 } });
      await productController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Falha ao remover um produto', async function () {
      const res = {};
      const req = {
        params: {
          id: 555,
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'remove').resolves(
        { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
      );
      await productController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});