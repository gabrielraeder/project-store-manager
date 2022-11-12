const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/products.model');
const salesService = require('../../../src/services/sales.service');

const salesMock = require('./mocks/sales.service.mock');

describe('SERVICE - SALES', function () {
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

  describe('Rotas GET', function () {
    beforeEach(sinon.restore);
    it('Testa buscar todas as vendas', async function () {
      sinon.stub(salesModel, 'findAll').resolves(salesMock.allSalesDB);

      const result = await salesService.findAll();
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(salesMock.allSalesDB);
    });

    it('Testa buscar uma venda por id, com sucesso', async function () {
      sinon.stub(salesModel, 'findById').resolves(salesMock.saleByIdDB);

      const result = await salesService.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(salesMock.saleByIdDB);
    });

    it('Testa buscar uma venda por id, com falha', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const result = await salesService.findById(555);
      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  describe('Rota DELETE', function () {
    beforeEach(sinon.restore);
    it('Testa remover um produto com sucesso', async function () {
      sinon.stub(salesModel, 'remove').resolves({ affectedRows: 1 });

      const result = await salesService.remove(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 1 });
    });

    it('Falha ao remover um produto', async function () {
      sinon.stub(salesModel, 'remove').resolves({ affectedRows: 0 });

      const result = await salesService.remove(555);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  describe('Rota PUT', function () {
    beforeEach(sinon.restore);
    it('Testa atualizar um produto com sucesso', async function () {
      sinon.stub(salesModel, 'update').resolves({ affectedRows: 1 });
      sinon.stub(salesModel, 'findById').resolves(true);

      const result = await salesService.update(1, salesMock.saleToUpdate);
      expect(result).to.deep.equal({ type: null, message: { saleId: 1, itemsUpdated: salesMock.saleToUpdate } });
    });

    it('Erro ao atualizar um produto saleId inexistente', async function () {
      sinon.stub(salesModel, 'findById').resolves();

      const result = await salesService.update(555, salesMock.saleToUpdate);
      expect(result).to.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
    });

    it('Erro ao atualizar um produto com quantidade "0"', async function () {
      sinon.stub(salesModel, 'findById').resolves(true);

      const result = await salesService.update(555, salesMock.saleQuantityZero);
      expect(result).to.deep.equal({ type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' });
    });

    it('Erro ao atualizar um produto com productId inválido', async function () {
      sinon.stub(salesModel, 'findById').resolves(true);
      sinon.stub(productsModel, 'findById').resolves(false);

      const result = await salesService.update(555, salesMock.saleToUpdate);
      expect(result).to.deep.equal({ type: 'ID_NOT_FOUND', message: 'Product not found' });
    });
  });
});