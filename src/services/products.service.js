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

const update = async (id, name) => {
  const error = validations.validateInsertData({ name });
  if (error.type) return error;
  const { affectedRows } = await productModel.update(+id, name);
  if (affectedRows === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: { id, name } };
};

const remove = async (id) => {
  const { affectedRows } = await productModel.remove(+id);
  if (affectedRows === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: { id } };
};

const querySearch = async (query) => {
  if (!query) {
    const products = await findAll();
    return products;
  }
  const result = await productModel.querySearch(query);
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
  querySearch,
};