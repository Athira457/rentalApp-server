import { gql } from 'apollo-server-micro';

export const manufacturerMutation = gql`
  type Mutation {
    registerManufacture(
      name: String!,
    ): Manufacturer!  

    registerModels(
    model_name: String!,
    manufacturer_id: ID
  ): Model! 
  }

  type Manufacturer {
    id: ID!
    name: String!
  }
`;
