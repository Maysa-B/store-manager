const productService = require('../services/productService');

const getProduct = async (_req, res) => {
  const result = await productService.getProduct();
  res.status(200).json(result);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const result = await productService.getProductById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });
    
  res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const result = await productService.createProduct(name);

  if (result.type) return res.status(result.type).json({ message: result.message });

  res.status(201).json(result);
};

const atualizeProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await productService.atualizeProduct(id, name);

  if (result.type) return res.status(result.type).json({ message: result.message });

  res.status(200).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await productService.deleteProduct(id);

  if (result.type) return res.status(result.type).json({ message: result.message });

  res.sendStatus(204);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;

  const result = await productService.searchProduct(q);

  res.status(200).json(result);
};

module.exports = {
  getProductById,
  getProduct,
  createProduct,
  atualizeProduct,
  deleteProduct,
  searchProduct,
};