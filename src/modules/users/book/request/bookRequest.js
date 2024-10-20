// Joi validation to update table
import Joi from 'joi';

const bookingSchema = Joi.object({
  pickupCity: Joi.string().required(),
  pickupLocation: Joi.string().required(),
  dropoffLocation: Joi.string().required(),
  pickupTime: Joi.date().iso().required(),  
  dropoffTime: Joi.date().iso().required(),  
  bookBy: Joi.string().required(),
  userId: Joi.number().integer().required(),
  vehicleName: Joi.string().required(),
  vId: Joi.number().integer().required(),
  totalRent: Joi.number().integer().required(),
});

export default bookingSchema;
