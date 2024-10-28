import { gql } from 'apollo-server';

export const carQuery = gql`
    input PriceRangeInput {
      min: Float
      max: Float
    }

    type Query {
    getAllVehiclesNew: [VehicleNew!]!
    getVehicleImageById(id: ID!): VehicleNew
    
    searchVehiclesByName(searchTerm: String): [CollectionVehicle]
    filterVehiclesByPrice(minPrice: Float, maxPrice: Float): [CollectionVehicle]
  }
`;