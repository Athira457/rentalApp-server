import  carModel  from './models/vehicleModel.js';
import { carQuery } from './queries/vehicleQuery.js';
import { carMutation } from './mutations/vehicleMutation.js';

const typeDefs = [
  carModel,
  carQuery,
  carMutation,
];

export default typeDefs;