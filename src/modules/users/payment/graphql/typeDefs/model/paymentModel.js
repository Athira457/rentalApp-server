import { gql } from 'apollo-server-micro';

// Define the payment type
const paymentType = gql`
 type RazorpayPayment {
    razorpay_payment_id: String!
    razorpay_order_id: String!
    razorpay_signature: String!
  }
`;
export default paymentType;