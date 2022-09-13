const salesModel = require('../models/salesModel');
const validation = require('./validations/validation');

const addSale = async (body) => {
  const error = validation.validateNewSale(body);
  if (error.type) return error;

  const result = await salesModel.addSale(body);
  if (result.type) return result;
  
  return { id: result, itemsSold: body };
};

const getSales = async () => {
  const result = await salesModel.getSales();
  return result;
};

const getSalesById = async (id) => {
  const result = await salesModel.getSalesById(id);

  return result[0];
};

const deleteSale = async (id) => {
  const result = await salesModel.deleteSale(id);

  return result;
};

const atualizeSale = async (id, body) => {
  const error = validation.validateNewSale(body);
  if (error.type) return error;

  const result = await salesModel.atualizeSale(id, body);

  return result;
};

module.exports = {
  addSale,
  getSales,
  getSalesById,
  deleteSale,
  atualizeSale,
};