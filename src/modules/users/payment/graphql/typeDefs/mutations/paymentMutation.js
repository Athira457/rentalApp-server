import { gql } from 'apollo-server-micro';

const paymentMutation = gql`
 type Mutation {
    createOrder(bookingId: Int!, amount: Int!): RazorpayOrderResponse
    verifyPayment(
      razorpay_order_id: String!,
      razorpay_payment_id: String!,
      razorpay_signature: String!
    ): PaymentVerificationResponse
 }
 `;

export default paymentMutation;
