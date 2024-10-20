import { gql } from 'apollo-server';

export const vehicleMutation = gql`
scalar Upload
  type Mutation {
    createVehicle(
      name: String!,
      model: String!,
      description: String,
      price: Float!,
      quantity: Int!,
      image: Upload,
      images: [Upload]
    ): Vehicle!

     updateVehicle(
      id: ID!,
      input: VehicleInput                
    ): Vehicle

    deleteVehicle(id: ID!): Vehicle
  }
  
  input VehicleInput {
  name: String
  description: String
  price: Float
  quantity: Int
}
`;
