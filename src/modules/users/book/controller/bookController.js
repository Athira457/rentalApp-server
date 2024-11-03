// controllers/BookController.js
import BookRepository from '../repository/bookRepository.js';
import bookingSchema from '../request/bookRequest.js';

class BookController {
  async createBooking(bookingData) {
    try {
      // Validate the booking data
      const { error } = bookingSchema.validate(bookingData);
      if (error) {
        throw new Error(`Validation error: ${error.message}`);
      }
      // Create booking
      const booking = await BookRepository.registerBooking(bookingData);   
      return booking;
    } catch (error) {
      console.error('Error in createBooking:', error);
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  async getAllBookings() {
    try {
      // Fetch all bookings from the repository
      const bookings = await BookRepository.fetchAllBookings();
      return bookings;
    } catch (error) {
      console.error('Error in getAllBookings:', error);
      throw new Error(`Failed to fetch all bookings: ${error.message}`);
    }
  }

  async getBookingById(userId){
    try {
      const bookings = await BookRepository.getBookingById(userId);
      return bookings.map((booking) => ({
        id: booking.id,
        pickupCity: booking.pickup_city,
        pickupLocation: booking.pickup_location,
        dropoffLocation: booking.dropoff_location,
        pickupTime: booking.pickup_time,
        dropoffTime: booking.dropoff_time,
        createdAt: booking.created_at,
        bookBy: booking.book_by,
        userId: booking.user_id,
        vehicleName: booking.vehicle_name,
        vId: booking.v_id,
        totalRent: booking.totalrent,
      }));
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw new Error("Unable to fetch bookings.");
    }
  }

}

export default new BookController;
