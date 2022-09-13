const express = require('express');
const productController = require('../controllers/productController');

const route = express.Router();

route.get('/', productController.getProduct);
route.get('/search', productController.searchProduct);
route.post('/', productController.createProduct);
route.put('/:id', productController.atualizeProduct);
route.get('/:id', productController.getProductById);
route.delete('/:id', productController.deleteProduct);

module.exports = route;