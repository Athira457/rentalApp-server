// Server side validation of Vehicle schema using Joi
const Joi = require('joi');

const vehicleValidation = Joi.object({
  manufacturer: Joi.string().min(2).max(50).required(),
  model: Joi.string().min(1).max(50).required(),
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(1).required(),
  seats: Joi.string().valid('2', '4', '5', '7').required(),
  fuel: Joi.string().valid('Petrol', 'Diesel', 'Electric', 'Hybrid').required(),
  gear: Joi.string().valid('Manual', 'Automatic', 'Semi-Automatic').required(),
});

module.exports = vehicleValidation;
