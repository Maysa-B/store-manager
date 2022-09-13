const connection = require('./connections');

const getProduct = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );

  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return result;
};

const createProduct = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUES(?)',
    [name],
  );

  return { id: result.insertId, name };
};

const atualizeProduct = async (id, name) => {
  const exist = await getProductById(id);

  if (exist.length === 0) return { type: 404, message: 'Product not found' };
  
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );

  return { id, name };
};

const deleteProduct = async (id) => {
  const exist = await getProductById(id);

  if (exist.length === 0) return { type: 404, message: 'Product not found' };

  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return { type: null };
};

const searchProduct = async (query) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products 
    WHERE name LIKE '%${query}%'`,
  );

  return result;
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  atualizeProduct,
  deleteProduct,
  searchProduct,
};