const connection = require('./connections');
const productModel = require('./productModel');

const verificaProduct = async (body) => {
  const products = (await productModel.getProduct()).map((cur) => cur.id);
  let initialResult = {};

  body.forEach((cur) => {
    if (!products.includes(cur.productId)) {
      initialResult = { type: 404, message: 'Product not found' };
    }
  });

  return initialResult;
};

const addSale = async (body) => {
  const initialResult = await verificaProduct(body);
  if (initialResult.type) return initialResult;

  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES (now())',
  );

  body.forEach(async (cur) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?)',
      [result.insertId, cur.productId, cur.quantity],
    );
  });

  return result.insertId;
};

const getSales = async () => {
  const [result] = await connection.execute(`
    SELECT sale_id, date, product_id, quantity FROM StoreManager.sales_products AS sa_pro
    INNER JOIN StoreManager.sales AS sales
    ON sales.id = sa_pro.sale_id ORDER BY id ASC`);

  return result;
};

const getSalesById = async (id) => {
  const result = await connection.execute(`
    SELECT date, product_id, quantity FROM StoreManager.sales_products AS sa_pro
    INNER JOIN StoreManager.sales AS sales
    ON sales.id = sa_pro.sale_id
    WHERE sale_id = ?;`,
    [id]);

  return result;
};

const deleteSale = async (id) => {
  const saleExists = await getSalesById(id);

  if (saleExists[0].length === 0) return { type: 404, message: 'Sale not found' };

  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return { type: null };
};

const atualizeSale = async (id, body) => {
  const initialResult = await verificaProduct(body);
  if (initialResult.type) return initialResult;

  const saleExists = await getSalesById(id);
  if (saleExists[0].length === 0) return { type: 404, message: 'Sale not found' };

  body.forEach(async (cur) => {
    await connection.execute(
      `UPDATE StoreManager.sales_products 
      SET product_id = ?, quantity = ? 
      WHERE sale_id = ? AND product_id = ?`,
      [cur.productId, cur.quantity, id, cur.productId],
    );
  });

  return { type: null };
};

module.exports = {
  addSale,
  getSales,
  getSalesById,
  deleteSale,
  atualizeSale,
};