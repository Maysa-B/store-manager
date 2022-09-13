const productModel = require('../models/productModel');
const validations = require('./validations/validation');

const getProduct = async () => {
  const result = await productModel.getProduct();
  return result;
};

const getProductById = async (id) => {
  const result = await productModel.getProductById(id);

  return result[0];
};

const createProduct = async (name) => {
  const valid = validations.validateName(name);

  if (valid.type) return valid;

  const result = await productModel.createProduct(name);

  return result;
};

const atualizeProduct = async (id, name) => {
  const valid = validations.validateName(name);
  
  if (valid.type) return valid;

  const result = await productModel.atualizeProduct(id, name);

  return result;
};

const deleteProduct = async (id) => {
  const result = await productModel.deleteProduct(id);

  return result;
};

const searchProduct = async (query) => {
  const result = await productModel.searchProduct(query);

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