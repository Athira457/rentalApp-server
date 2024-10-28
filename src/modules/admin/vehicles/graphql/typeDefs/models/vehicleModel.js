// car model create model in graphql
import { gql } from "apollo-server-micro";

const carModel = gql`
  type VehicleNew {
    id: ID!
    manufacturer: String!
    model: String!
    name: String!
    description: String!
    price: Float!
    quantity: Int!
    seats: String!
    fuel: String!
    gear: String!
    primaryimage: Image
    secondaryimages: [ImageType]
  }

  type ImageType {
  images: [String]
  }

  type Image {
    id: ID
    images: String
    isprimary: Int
    vehicleid: ID
  }

  type ImageNew {
    id: ID
    images: [String]
    isprimary: Int
    vehicleid: ID
  }

  type CollectionVehicle {
  id: String
  manufacturer: String
  model: String
  name: String
  description: String
  price: Float
  quantity: Int
  seats: String
  fuel: String
  gear: String
  primaryImage: String
  secondaryImages: [String]
}
`;

export default carModel;
