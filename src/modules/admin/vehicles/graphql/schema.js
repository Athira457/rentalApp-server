import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/carResolver.js';

const carSchema = makeExecutableSchema({
  typeDefs,   
  resolvers,  
});
export default carSchema;