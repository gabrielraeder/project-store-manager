const productModel = require('../models/products.model');
const validations = require('./validations/inputValidations');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validations.validateId(id);
  if (error.type) return error;

  const product = await productModel.findById(id);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insert = async (data) => {
  const error = validations.validateInsertData(data);
  if (error.type) return error;
  
  const productId = await productModel.insert(data);
  const product = await productModel.findById(productId);
  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
  insert,
};