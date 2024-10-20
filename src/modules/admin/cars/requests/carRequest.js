//carRequest file handles server side validation using Joi
import Joi from 'joi';

class VehicleRequest {
  static validateVehicle(vehicleData) {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      model: Joi.string().min(1).max(50).required(),
      description: Joi.string().min(10).max(500).required(),
      price: Joi.number().precision(2).positive().required(),
      quantity: Joi.number().integer().min(0).required(),
      image: Joi.string().uri().required(),
      images: Joi.array().items(Joi.string().uri()).optional() 
    });

    return schema.validateAsync(vehicleData);
  }
}

export default VehicleRequest;
