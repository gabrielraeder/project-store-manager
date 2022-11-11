const schemas = require('./schemas');
const productsModel = require('../../models/products.model');

const validateId = (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  
  return { type: null, message: '' };
};

const validateInsertData = (data) => {
  const { error } = schemas.insertProductSchema.validate(data);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
  }
  return { type: null, message: '' };
};

const validateSalesQuantity = (value) => {
  const { error } = schemas.salesQuantitySchema.validate(value);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }
  return { type: null, message: '' };
};

const validateProductIdExistence = async (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: 'ID_NOT_FOUND', message: 'Product not found' };
  const product = await productsModel.findById(id);
  if (!product) return { type: 'ID_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateInsertData,
  validateSalesQuantity,
  validateProductIdExistence,
};