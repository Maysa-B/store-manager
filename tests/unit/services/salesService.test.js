const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');
const mock = require('../../mocks/sales.mock');

describe('Testes da camada Service - sales', () => {
  it('Testa a função addSale quando funciona corretamente', async () => {
    sinon.stub(salesModel, 'addSale').resolves(5);

    const result = await salesService.addSale(mock.bodyToAddSale);

    expect(result).to.be.deep.equal(mock.resultFromAddSale);
  });

  it('Testa a função getSales', async () => {
    sinon.stub(salesModel, 'getSales').resolves([mock.resultFromGetSales]);

    const result = await salesService.getSales();

    expect(result).to.be.deep.equal([mock.resultFromGetSales]);
  });

  it('Testa a função getSalesById', async () => {
    sinon.stub(salesModel, 'getSalesById').resolves([mock.resultFromGetSalesIdOne]);
    const result = await salesService.getSalesById(1);

    expect(result).to.be.equal(mock.resultFromGetSalesIdOne);
  });

  afterEach(() => sinon.restore());
});