import paymentType from './model/paymentModel.js';
import paymentMutation from './mutations/paymentMutation.js';
import paymentQuery from './queries/paymentQuery.js';

const typeDefs = [
    paymentType, 
    paymentMutation, 
    paymentQuery,
];

export default typeDefs;
