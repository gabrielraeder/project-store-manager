const salesModel = require('../models/sales.model');
const validations = require('./validations/inputValidations');

const insert = async (array) => {
  const quantityError = await validations.checkQuantities(array);
  if (quantityError) return quantityError;
  const idNotFound = await validations.checkIds(array);
  if (idNotFound) return idNotFound; 
  const saleId = await salesModel.insertSale();
  const res = array.map((sale) => salesModel.insert(sale, saleId));
  await Promise.all(res);

  const result = {
    id: saleId,
    itemsSold: array,
  };
  return { type: null, message: result };
};

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const sales = await salesModel.findById(+id);
  if (!sales || sales.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sales };
};

const remove = async (id) => {
  const { affectedRows } = await salesModel.remove(+id);
  if (affectedRows === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: { id } };
};

const update = async (id, array) => {
  const findSaleById = await findById(+id);
  if (findSaleById.type) return findSaleById;
  const quantityError = await validations.checkQuantities(array);
  if (quantityError) return quantityError;
  const idNotFound = await validations.checkIds(array);
  if (idNotFound) return idNotFound; 
  const res = array.map((sale) => salesModel.update(+id, sale.productId, sale.quantity));
  await Promise.all(res);

  const result = {
    saleId: id,
    itemsUpdated: array,
  };
  return { type: null, message: result };
};

module.exports = {
  insert,
  findAll,
  findById,
  remove,
  update,
};