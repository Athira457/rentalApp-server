import pool from '../../../../config/DBconnect/db.js';
class BookRepository {
    // Get all book details from postgres book table
    async getAllBookings() {
        const result = await pool.query('SELECT * FROM book');
        return result.rows;
    }

    async registerBooking(bookingData) {
        try {
          const query = `
          INSERT INTO book (pickup_city, pickup_location, dropoff_location, pickup_time, dropoff_time, book_by, user_id, vehicle_name, v_id, totalRent)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *;
          `;
        const values = [
          bookingData.pickupCity,
          bookingData.pickupLocation,
          bookingData.dropoffLocation,
          bookingData.pickupTime,
          bookingData.dropoffTime,
          bookingData.bookBy,
          bookingData.userId,
          bookingData.vehicleName,
          bookingData.vId,
          bookingData.totalRent,
        ];

        const result = await pool.query(query, values);
        return result.rows[0]; 
        } catch (error) {
          console.error('Error creating booking:', error);
          throw new Error('Error creating booking: ' + error.message);
        }
      }

      async fetchAllBookings() {
        try {
          // Fetch all bookings from the database
          const query = 'SELECT * FROM book';
          const result = await pool.query(query);
          return result.rows;
        } catch (error) {
          throw new Error(`Database query failed: ${error.message}`);
        }
      }
}
export default new BookRepository();