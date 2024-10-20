import userType from './models/usersModel.js';
import userQuery from './queries/userQueries.js';
import userMutation from './mutations/userMutations.js';

const typeDefs = [
  userType, 
  userQuery, 
  userMutation, 
];

export default typeDefs;
