import { gql } from 'apollo-server-micro';

export const carMutation = gql`
scalar Upload
    type Mutation {
        registerVehicle(
        manufacturer: String!
        model: String!
        name: String!
        description: String!
        price: Float!
        quantity: Int!
        seats: String!
        fuel: String!
        gear: String!
        ):VehicleNew 

        registerImages(
        images: [Upload]
        isprimary: Int!
        vehicleid: ID
        ): ImageNew
    }
        type vehicleNew{
        id: ID!
        manufacturer: String
        model: String
        name: String
        description: String
        price: Float
        quantity: Int
        seats: String
        fuel: String
        gear: String
        }

    `;