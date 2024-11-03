import { gql } from 'apollo-server-micro';

const userMutation = gql`
scalar Upload
 type Mutation {
    registerUser(
      name: String!
      email: String!
      phone: String!
      city: String!
      state: String!
      country: String!
      pincode: String!
      password: String!
    ): User!

    loginUser(
      email: String, 
      password: String
    ): AuthPayload

    updateProfile(
      id: ID!
      name: String
      email: String 
      phone: String
      city: String
      state: String
      country: String
      pincode: String
      file: Upload
      ): User
  }
`;

export default userMutation;
