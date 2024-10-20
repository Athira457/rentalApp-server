import { gql } from 'apollo-server';

export const vehicleQuery = gql`
  type Query {
    getVehicleById(id: ID!): Vehicle
    getAllVehicles: [Vehicle]
  }
`;
