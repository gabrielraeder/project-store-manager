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

const createProduct = async (req, res) => {
  const data = req.body;
  const { type, message } = await productService.insert(data);
  if (type) return res.status(422).json({ message });
  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.update(+id, name);
  if (type && type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });
  if (type && type === 'INVALID_VALUE') return res.status(422).json({ message });
  return res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.remove(+id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json();
};

const querySearch = async (req, res) => {
  const { q } = req.query;
  const { message } = await productService.querySearch(q);
  return res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
  createProduct,
  update,
  remove,
  querySearch,
};