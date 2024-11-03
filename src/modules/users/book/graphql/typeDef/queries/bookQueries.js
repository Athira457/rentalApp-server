import { gql } from 'apollo-server-micro';

const bookQuery = gql`
  type Query {
    getAllBookings: [Booking]
    getBookingById(userId: Int): [Booking]
  }
`;

export default bookQuery;
