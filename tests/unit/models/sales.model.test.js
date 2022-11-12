const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

const salesMock = require('./mocks/sales.mock')

describe(' MODEL - SALES', function () {
  describe('Rota POST', function () {
    beforeEach(sinon.restore);
    it('Testa adicionar nova venda em sales', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await salesModel.insertSale();

      expect(result).to.equal(3);
    });

    it('Testa adicionar nova venda em product_sales', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await salesModel.insert(3, salesMock.newSale[0]);

      expect(result).to.equal(3);
    });
  });

  describe('Rotas GET', function () {
    beforeEach(sinon.restore);
    it('Testa buscar todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock.allSalesDB]);

      const result = await salesModel.findAll();

      expect(result).to.deep.equal(salesMock.allSalesDB);
    });

    it('Testa buscar uma venda por id, com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([salesMock.saleByIdDB]);

      const result = await salesModel.findById(1);

      expect(result).to.deep.equal(salesMock.saleByIdDB);
    });
  });

  describe('Rota DELETE', function () {
    beforeEach(sinon.restore);
    it('Testa remover um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.remove(1);
      expect(result.affectedRows).to.equal(1);
    });
  });
});