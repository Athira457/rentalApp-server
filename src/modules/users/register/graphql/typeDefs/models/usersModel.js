import { gql } from 'apollo-server-micro';

// Define the User type
const userType = gql`
   type User {
    id: ID!
    name: String
    email: String!
    phone: String
    city: String
    state: String
    country: String
    pincode: String
    password: String
  }
    
  type AuthPayload {
    token: String
    user: User
  }
`;

export default userType;
