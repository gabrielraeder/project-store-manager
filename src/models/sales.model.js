const camelize = require('camelize');
const snakeize = require('snakeize');
const conn = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );

  return insertId;
};

const insert = async (data, saleId) => {
  const columns = Object.keys(snakeize(data))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(data)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertId }] = await conn.execute(
    `INSERT INTO StoreManager.sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`,
    [...Object.values(data), saleId],
  );

  return insertId;
};

const findAll = async () => {
  const [result] = await conn.execute(
    `SELECT sp.*, s.date FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id`,
  );
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await conn.execute(
    `SELECT sp.product_id, sp.quantity, s.date FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE sp.sale_id = ? ORDER BY sp.sale_id, sp.product_id`,
    [id],
  );
  return camelize(result);
};

const remove = async (id) => {
  const [result] = await conn.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return result;
};

const update = async (saleId, productId, quantity) => {
  const [result] = await conn.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );
  return result;
};

module.exports = {
  insert,
  insertSale,
  findAll,
  findById,
  remove,
  update,
};