import { gql } from 'apollo-server-micro';

const paymentQuery = gql`
 type Query {
    getAllPayments: [payment]
}
 `;

export default paymentQuery;