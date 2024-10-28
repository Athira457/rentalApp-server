import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/userResolver.js';

const userSchema = makeExecutableSchema({
  typeDefs,   
  resolvers,  
});
export default userSchema;