const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');

const salesMock = require('./mocks/sales.controller.mock');


describe('Testa camada CONTROLLER de rotas SALES', function () {
  describe('Rota POST', function () {
    beforeEach(sinon.restore);
    it('Testa adicionar nova venda com sucesso', async function () {
      const res = {};
      const req = {
        body: salesMock.newSale
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'insert').resolves({ type: null, message: salesMock.newSale });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(201);

      expect(res.json).to.have.been.calledWith(salesMock.newSale);
    });

    it('Testa adicionar nova venda com productId errado', async function () {
      const res = {};
      const req = {
        body: salesMock.wrongProductId,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'insert').resolves({ type: 'ID_NOT_FOUND', message: 'Product not found' });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Testa adicionar nova venda com quantity "0"', async function () {
      const res = {};
      const req = {
        body: salesMock.wrongQuantity,
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'insert').resolves({
        type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1',
      });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(422);

      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  })
});