import { gql } from 'apollo-server-micro';

// Define the book type
const bookType = gql`
    type Booking {
    id: ID
    pickupCity: String
    pickupLocation: String
    dropoffLocation: String
    pickupTime: String
    dropoffTime: String
    createdAt: String
    bookBy: String
    userId: Int
    vehicleName: String
    vId: Int
    totalRent: Int
    }
`;

export default bookType;
