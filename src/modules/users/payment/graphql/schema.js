import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolver/paymentResolver.js';

const paymentSchema = makeExecutableSchema({
  typeDefs,   
  resolvers,  
});
export default paymentSchema;