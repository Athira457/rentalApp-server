import Joi from 'joi';

// Define Joi schema for Manufacturer input
export const ManuValidation = Joi.object({
    name: Joi.string().min(2).max(100).required()
});
