import { gql } from 'apollo-server-micro';

export const manufacturerModels = gql`
     type Manufacturer {
        id: ID!
        name: String!
    }

    type Model {
    id: ID!
    model_name: String!
    manufacturer_id: ID
    } 
`;
