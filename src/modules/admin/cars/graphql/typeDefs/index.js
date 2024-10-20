import { vehicleModel } from './models/vehicleModel.js';
import { vehicleQuery } from './queries/vehicleQuery.js';
import { vehicleMutation } from './mutations/vehicleMutation.js';

const typeDefs = [
  vehicleModel,
  vehicleQuery,
  vehicleMutation,
];

export default typeDefs;