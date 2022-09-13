const camelize = require('camelize');
const salesService = require('../services/salesService');

const addSale = async (req, res) => {
  const result = await salesService.addSale(req.body);

  if (result.type) return res.status(result.type).json({ message: result.message });

  res.status(201).json(result);
};

const getSales = async (_req, res) => {
  const result = await salesService.getSales();
  res.status(200).json(camelize(result));
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.getSalesById(id);

  if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(camelize(result));
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.deleteSale(id);

  if (result.type) return res.status(404).json({ message: result.message });

  res.sendStatus(204);
};

const atualizeSale = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.atualizeSale(id, req.body);

  if (result.type) return res.status(result.type).json({ message: result.message });

  res.status(200).json({ saleId: id, itemsUpdated: req.body });
};

module.exports = {
  addSale,
  getSales,
  getSalesById,
  deleteSale,
  atualizeSale,
};