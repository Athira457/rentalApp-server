import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/manufactureResolver.js';

const manuSchema = makeExecutableSchema({
  typeDefs,   
  resolvers,  
});
export default manuSchema;