const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

const salesMock = require('./mocks/sales.mock')

describe('Testa camada MODEL de rotas SALES', function () {
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
  })
});