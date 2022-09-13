const Joi = require('joi');

const productName = Joi.string().min(5).required();
const number = Joi.number().integer().required();

const salesArr = Joi.array().items({
  productId: number,
  quantity: number.min(1),
});

const validateName = (name) => {
  const { error } = productName.validate(name);

  if (error) {
    if (error.message === '"value" is required') {
      return { type: 400, message: error.message.replace('value', 'name') };
    }

    return { type: 422, message: error.message.replace('value', 'name') };
  }

  return { type: null, message: '' };
};

const validateNewSale = (salesArray) => {
  const { error } = salesArr.validate(salesArray);

  if (error) {
    if (error.message.includes('must be greater than or equal to 1')) {
      return { type: 422, message: error.message.replace('[0].', '') };
    }

    return { type: 400, message: error.message.replace('[0].', '') };
  }

  return { type: null };
};

module.exports = {
  validateName,
  validateNewSale,
};