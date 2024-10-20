import pool from '../../../../config/DBconnect/db.js';

class PaymentRepository {

    async processPayment(bookingId, razorpayPaymentId, razorpayOrderId, razorpaySignature) {
        // Update the booking status or save the payment details in your database
        const result = await pool.query(
          `UPDATE payment
           SET razorpayPaymentId = $1, razorpayOrderId = $2, razorpaySignature = $3 
           WHERE id = $4 RETURNING *`,
          [razorpayPaymentId, razorpayOrderId, razorpaySignature, bookingId]
        );
        return result.rows[0]; // Return the updated booking
      }

}
export default new PaymentRepository();