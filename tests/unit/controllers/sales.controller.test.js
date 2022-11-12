const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');

const salesMock = require('./mocks/sales.controller.mock');


describe('CONTROLLER - SALES', function () {
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
  });

  describe('Rotas GET', function () {
    beforeEach(sinon.restore);
    it('Testa buscar todas as vendas', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'findAll').resolves({
        type: null, message: salesMock.allSalesDB,
      });

      await salesController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith(salesMock.allSalesDB);
    });

    it('Testa buscar uma venda por id, com sucesso', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'findById').resolves({
        type: null, message: salesMock.saleByIdDB,
      });

      await salesController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);

      expect(res.json).to.have.been.calledWith(salesMock.saleByIdDB);
    });

    it('Testa buscar uma venda por id, com falha', async function () {
      const res = {};
      const req = {
        params: {
          id: 555,
        }
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'findById').resolves({
        type: 'SALE_NOT_FOUND', message: 'Sale not found',
      });

      await salesController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
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

      sinon.stub(salesService, 'remove').resolves({ type: null, message: { id: 1 } });
      await salesController.remove(req, res);

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

      sinon.stub(salesService, 'remove').resolves(
        { type: 'SALE_NOT_FOUND', message: 'Sale not found' }
      );
      await salesController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
});