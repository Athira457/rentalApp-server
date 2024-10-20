import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/vehicleResolver.js';

const vehicleSchema = makeExecutableSchema({
  typeDefs,   
  resolvers,  
});
export default vehicleSchema;