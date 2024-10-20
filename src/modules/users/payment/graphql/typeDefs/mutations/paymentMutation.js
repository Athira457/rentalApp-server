import { gql } from 'apollo-server-micro';

const paymentMutation = gql`
 type Mutation {
    processPayment(
      bookingId: ID,
      razorpayPaymentId: String,
      razorpayOrderId: String,
      razorpaySignature: String
    ): Booking

 }
 `;

export default paymentMutation;
