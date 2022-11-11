// const camelize = require('camelize');
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

// const insert = async (data) => {
//   const saleId = await insertSale();
//   const allSales = await Promise.all(
//     data.map((sale) => ),
//   );
// };

module.exports = {
  insert,
  insertSale,
};