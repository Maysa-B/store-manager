const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../src/services/productService');
const productsModel = require('../../../src/models/productModel');
const mock = require('../../mocks/products.mock');

describe('Testes da camada Service - products', () => {
  it('Testa função getProducts', async () => {
    sinon.stub(productsModel, 'getProduct').resolves(mock.getProductsResult);

    const result = await productsService.getProduct();

    expect(result).to.be.deep.equal(mock.getProductsResult);
  });

  it('Testa função getProductsById em caso de sucesso', async () => {
    sinon.stub(productsModel, 'getProductById').resolves([mock.getProductsResult[0]]);

    const result = await productsService.getProductById(1);

    expect(result).to.be.deep.equal(mock.getProductsResult[0]);
  });

  it('Testa a função createProduct em caso de sucesso', async () => {
    sinon.stub(productsModel, 'createProduct').resolves({ id: 5, name: 'Chocolate Willy Wonka' });

    const result = await productsService.createProduct('Chocolate Willy Wonka');

    expect(result).to.be.deep.equal({ id: 5, name: 'Chocolate Willy Wonka' });
  });

  afterEach(() => sinon.restore());
});