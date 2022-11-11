const salesService = require('../services/sales.service');

const createSales = async (req, res) => {
  const array = req.body;
  const { type, message } = await salesService.insert(array);
  if (type && type === 'ID_NOT_FOUND') return res.status(404).json(message);
  if (type && type === 'INVALID_VALUE') return res.status(422).json(message);
  return res.status(201).json(message);
};

module.exports = {
  createSales,
};