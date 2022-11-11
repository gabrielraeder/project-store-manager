const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productController = require('../../../src/controllers/products.controller');
const productService = require('../../../src/services/products.service');

const productsMock = require('./mocks/products.mock');

describe('Testa camada CONTROLLER de rotas products', function () {
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
});