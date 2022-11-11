const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/products.model');
const salesService = require('../../../src/services/sales.service');

const salesMock = require('./mocks/sales.service.mock');

describe('Testa camada SERVICE de rotas SALES', function () {
  describe('Rota POST', function () {
    beforeEach(sinon.restore);
    it('Testa adicionar nova venda em product_sales', async function () {
      sinon.stub(salesModel, 'insertSale').resolves(3);
      sinon.stub(productsModel, 'findById').resolves(true);
      sinon.stub(salesModel, 'insert').resolves();

      const result = await salesService.insert(salesMock.newSale);

      expect(result).to.deep.equal({ type: null, message: salesMock.newSaleDBReturn })
    });

    it('erro ao adicionar nova venda com productId invalido', async function () {
      sinon.stub(productsModel, 'findById').resolves(false);

      const result = await salesService.insert(salesMock.wrongProductId);

      expect(result.type).to.equal('ID_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });

    it('erro ao adicionar nova venda com quantity "0"', async function () {
      const result = await salesService.insert(salesMock.wrongQuantity);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"quantity" must be greater than or equal to 1');
    });
  });
});