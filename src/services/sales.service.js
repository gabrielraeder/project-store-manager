const salesModel = require('../models/sales.model');
const validations = require('./validations/inputValidations');

// const checkIds = async (array) => {
//   const productsIds = array.map((sale) => sale.productId);
//   const isProducts = await Promise.all(productsIds.map(
//     async (p) => validations.validateProductIdExistence(+p),
//   ));
//   const idNotFound = isProducts.find((i) => i.type === 'ID_NOT_FOUND');
//   return idNotFound;
// };

// const checkQuantities = async (array) => {
//   const quantities = array.map((sale) => sale.quantity);
//   const validation = quantities.map((q) => validations.validateSalesQuantity(q));
//   const error = validation.find((i) => i.type === 'INVALID_VALUE');
//   return error;
// };

const insert = async (array) => {
  // const quantities = array.map((sale) => sale.quantity);
  // const validation = quantities.map((q) => validations.validateSalesQuantity(q));
  // const error = validation.find((i) => i.type === 'INVALID_VALUE');
  const error = await validations.checkQuantities(array);
  if (error) return error;
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
  const res = array.map((sale) => salesModel.update(+id, sale.productId, sale.quantity));
  await Promise.all(res);

  const result = {
    saleId: id,
    itemsSold: array,
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