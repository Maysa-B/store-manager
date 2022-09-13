const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');
const sinonChai = require('sinon-chai');
const mock = require('../../mocks/products.mock');

describe('Testes da camada Controller - products', () => {
  it('Testa a função getProducts', async () => {
    sinon.stub(productService, 'getProduct').resolves(mock.getProductsResult);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.getProductsResult);
  });

  it('Testa a função getProductsById em caso de sucesso', async () => {
    sinon.stub(productService, 'getProductById').resolves(mock.getProductsResult[0]);

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.getProductsResult[0]);
  });

  it('Testa a função getProductById em caso de erro', async () => {
    sinon.stub(productService, 'getProductById').resolves();

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Testa a função createProduct em caso de sucesso', async () => {
    sinon.stub(productService, 'createProduct').resolves(['mockado']);

    const req = { body: { name: 'Chicote da verdade WW' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(['mockado']);
  });

  it('Testa a função createProduct em caso de erro', async () => {
    sinon.stub(productService, 'createProduct').resolves(mock.error);

    const req = { body: { name: 'Chicote da verdade WW' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(mock.error.type);
    expect(res.json).to.have.been.calledWith({ message: mock.error.message });
  });

  afterEach(() => sinon.restore());
});