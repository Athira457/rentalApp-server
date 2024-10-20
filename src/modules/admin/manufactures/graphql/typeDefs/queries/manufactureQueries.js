import { gql } from 'apollo-server';

export const manufacturerQuery = gql`
  type Query {
    GetManufacturers: [Manufacturer!]!,
    GetModels(manufacturer_id: ID!): [Model!]
  }
`;