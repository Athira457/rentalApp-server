import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typeDef/index.js';
import resolvers from './resolver/bookResolver.js';

const bookSchema = makeExecutableSchema({
  typeDefs,   
  resolvers,  
});
export default bookSchema;