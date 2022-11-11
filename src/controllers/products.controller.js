const productService = require('../services/products.service');

const findAll = async (_req, res) => {
  const { message } = await productService.findAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
};