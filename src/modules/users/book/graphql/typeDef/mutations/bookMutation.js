import { gql } from 'apollo-server-micro';

const bookMutation = gql`
type Mutation {
    createBooking(
      userId: Int,
      pickupCity: String,
      pickupLocation: String,
      dropoffLocation: String,
      pickupTime: String,
      dropoffTime: String,
      bookBy: String,
      vehicleName: String,
      vId: Int
      totalRent: Int
    ): Booking
  }
  `;

export default bookMutation;