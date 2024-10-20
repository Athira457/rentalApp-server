const Joi = require('joi');

const imageSchema = Joi.object({
  images: Joi.array()
    .items(Joi.string().uri().required())
    .required()
    .messages({
      'array.base': 'Images must be an array',
      'string.uri': 'Each image URL must be a valid URI',
      'any.required': 'Image URL is required',
    }),
  
  isprimary: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'isprimary must be a boolean',
      'any.required': 'isprimary is required',
    }),
  
  vehicleid: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'vehicleid must be a number',
      'any.required': 'vehicleid is required',
    })
});

module.exports = imageSchema;
