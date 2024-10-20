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
}

export default new BookController;
