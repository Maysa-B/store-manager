const express = require('express');
const productRouter = require('./routes/productRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productRouter);
app.use('/sales', salesRouter);

module.exports = app;
