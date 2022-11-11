const salesModel = require('../models/sales.model');
const validations = require('./validations/inputValidations');

const checkIds = async (array) => {
  const productsIds = array.map((sale) => sale.productId);
  const isProducts = await Promise.all(productsIds.map(
    async (p) => validations.validateProductIdExistence(+p),
  ));
  const idNotFound = isProducts.find((i) => i.type === 'ID_NOT_FOUND');
  return idNotFound;
};

const insert = async (array) => {
  const saleId = await salesModel.insertSale();
  const quantities = array.map((sale) => sale.quantity);
  const validation = quantities.map((q) => validations.validateSalesQuantity(q));
  const error = validation.find((i) => i.type === 'INVALID_VALUE');
  if (error) return error;
  const idNotFound = await checkIds(array);
  if (idNotFound) return idNotFound; 
  const res = array.map((sale) => salesModel.insert(sale, saleId));
  await Promise.all(res);

  const result = {
    id: saleId,
    itemsSold: array,
  };
  return { type: null, message: result };
};

module.exports = {
  insert,
};