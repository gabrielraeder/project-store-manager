// const camelize = require('camelize');
// const snakeize = require('snakeize');
const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (id) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const insert = async (data) => {
  const columns = Object.keys(data)
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(data)
    .map((_key) => '?')
    .join(', ');
  
  const [{ insertId }] = await conn.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUES (${placeholders})`,
    [...Object.values(data)],
  );

  return insertId;
};

const update = async (id, name) => {
  const [result] = await conn.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result;
};

const remove = async (id) => {
  const [result] = await conn.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

const querySearch = async (query) => {
  const string = `%${query}%`;
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [string],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
  querySearch,
};