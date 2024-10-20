import { gql } from 'apollo-server-micro';

const bookQuery = gql`
  type Query {
    getAllBookings: [Booking]
  }
`;

export default bookQuery;
