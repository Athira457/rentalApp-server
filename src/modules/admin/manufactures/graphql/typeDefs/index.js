import { manufacturerModels } from './models/manufactureModel.js';
import { manufacturerQuery } from './queries/manufactureQueries.js';
import { manufacturerMutation } from './mutations/manufactureMutation.js';

const typeDefs = [
  manufacturerModels,
  manufacturerQuery,
  manufacturerMutation,
];

export default typeDefs;