import { gql } from 'apollo-server-micro';

// Define the payment type
const paymentType = gql`
type RazorpayOrderResponse {
  id: String!
  amount: Int!
  currency: String!
  receipt: String!
}

type PaymentVerificationResponse {
  success: Boolean!
  message: String!
}

type payment{
  id: ID
  bookingId: Int
  amount: Int
  status: String
}
`;
export default paymentType;