const connection = require('../../../src/models/connections');
const productModel = require('../../../src/models/productModel');
const sinon = require('sinon');
const { expect } = require('chai');
const mock = require('../../mocks/products.mock');

describe('Testando camada model - Products', () => {
  it('Testa retorno de SELECT todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([mock.getProductsResult]);

    const result = await productModel.getProduct();

    expect(result).to.be.deep.equal(mock.getProductsResult);
  });

  it('Testa retorno de SELECT produto por id', async () => {
    sinon.stub(connection, 'execute').resolves([mock.getProductsResult[0]]);

    const result = await productModel.getProductById(1);

    expect(result).to.be.deep.equal(mock.getProductsResult[0]);
  });

  it('Testa retorno de INSERT novo product', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const name = 'Chocolate Willy Wonka';

    const result = await productModel.createProduct(name);

    expect(result).to.have.property('id');
    expect(result).to.have.property('name');
    expect(result.id).to.be.equal(5);
    expect(result.name).to.be.equal(name);
  });

  afterEach(() => sinon.restore());
});