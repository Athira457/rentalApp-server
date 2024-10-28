import { gql } from 'apollo-server-micro';

const userQuery = gql`
  type Query {
    users: [User]!
    getUserByEmail(email: String!): User
    getUserDetails(id: ID): User
  }
`;

export default userQuery;
