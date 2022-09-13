const connection = require('../../../src/models/connections');
const salesModel = require('../../../src/models/salesModel');
const productModel = require('../../../src/models/productModel');
const mock = require('../../mocks/sales.mock');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Testando camada model - Sales', () => {
  it('Testa retorno de SELECT todas as vendas', async () => {
    sinon.stub(connection, 'execute').resolves([mock.resultFromGetSales]);

    const result = await salesModel.getSales();

    expect(result[0]).to.have.property('saleId');
    expect(result[0]).to.have.property('date');
    expect(result[0]).to.have.property('productId');
    expect(result[0]).to.have.property('quantity');
  });

  it('Testa retorno de SELECT para um id de vendas', async () => {
    sinon.stub(connection, 'execute').resolves([mock.resultFromGetSalesIdOne]);

    const result = await salesModel.getSalesById(1);

    expect(result).to.be.deep.equal([mock.resultFromGetSalesIdOne]);
  });

  it('Testa retorno de INSERT quando dá certo', async () => {
    sinon.stub(productModel, 'getProduct').resolves([1, 2, 3]);
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const result = await salesModel.addSale([mock.bodyToAddSale]);

    expect(result).to.be.equal(5);
  });

  afterEach(() => sinon.restore());
});