import { gql } from 'apollo-server';

export const vehicleModel = gql`
  type Vehicle {
    id: ID!
    name: String!
    model: String
    description: String!
    price: Float!
    quantity: Int!
    image: String
    images: [String]
  }

  input VehicleInput {
    name: String!
    model: String
    description: String!
    price: Float!
    quantity: Int!
    image: String
    images: [String]
  }
`;
