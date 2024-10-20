import bookType from './model/bookModel.js';
import bookQuery from './queries/bookQueries.js';
import bookMutation from './mutations/bookMutation.js';

const typeDefs = [
    bookType, 
    bookQuery, 
    bookMutation, 
];

export default typeDefs;
