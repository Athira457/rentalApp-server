// book resolver handles graphql operation
import BookController from '../../controller/bookController.js';

const resolvers = {
  Query: {
    getAllBookings: async () => {
      try {
        const bookings = await BookController.getAllBookings();     
        return bookings.map(booking => ({
          id: booking.id,
          userId: booking.user_id,
          pickupCity: booking.pickup_city,
          pickupLocation: booking.pickup_location,
          dropoffLocation: booking.dropoff_location,
          pickupTime: booking.pickup_time,
          dropoffTime: booking.dropoff_time,
          bookBy: booking.book_by,
          vehicleName: booking.vehicle_name,
          vId: booking.v_id,
          totalRent: booking.totalrent,
        }));
      } catch (error) {
        throw new Error(`Error fetching all bookings: ${error.message}`);
      }
    },

    getBookingById: async (_, { userId }) => {
      const booking = await BookController.getBookingById(userId);
      return booking;
    },
  },

  Mutation: {
    //booking create mutation
    createBooking: async (_, args) => {
      try {
        const booking = await BookController.createBooking(args);     
        return booking; 
      } catch (error) {
        throw new Error(`Error creating booking: ${error.message}`);
      }
    },
  },
};

export default resolvers;
