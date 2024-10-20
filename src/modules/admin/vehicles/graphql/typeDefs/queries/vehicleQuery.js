import { gql } from 'apollo-server';

export const carQuery = gql`
    input PriceRangeInput {
      min: Float
      max: Float
    }

    type Query {
    getAllVehiclesNew: [VehicleNew!]!
    getVehicleImageById(id: ID!): VehicleNew
    searchVehicle(searchTerm: String!): [VehicleNew]
    searchVehicles(searchTerm: String, priceRange: PriceRangeInput): [VehicleNew]
  }
`;