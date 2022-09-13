const express = require('express');
const salesController = require('../controllers/salesController');

const route = express.Router();

route.get('/', salesController.getSales);
route.post('/', salesController.addSale);
route.get('/:id', salesController.getSalesById);
route.delete('/:id', salesController.deleteSale);
route.put('/:id', salesController.atualizeSale);

module.exports = route;