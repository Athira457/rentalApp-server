// payment controller
import PaymentRepository from '../repository/paymentRepository.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
});

class PaymentController {

  constructor() {
    this.sharedId  = null;
    this.sharedAmount = null;
  }

  async createOrder(bookingId, amount) {
    this.sharedId = bookingId;
    this.sharedAmount = amount;
    try {
      const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: `receipt_${bookingId}`,
      };
      const order = await razorpay.orders.create(options);

      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      };
    } catch (error) {
      throw new Error('Error creating Razorpay order: ' + error.message);
    }
  }

  // Method to verify the Razorpay payment
  async verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    try {
      const body = razorpay_order_id + "|" + razorpay_payment_id;

      // Validate the signature using HMAC-SHA256
      const expectedSignature = crypto
        .createHmac('sha256', process.env.NEXT_PUBLIC_RAZORPAY_SECRET)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature === razorpay_signature) {

        const paymentData = {
          bookingId:this.sharedId,
          amount:this.sharedAmount,
          status: 'Completed',  
        };
        const { bookingId, amount, status } = paymentData;

        // Insert the payment details into PostgreSQL
        await PaymentRepository.insertPayment( bookingId, amount, status);
        return {
          success: true,
          message: 'Payment verified successfully!',
        };
      } else {
        return {
          success: false,
          message: 'Invalid signature, payment verification failed!',
        };
      }
    } catch (error) {
      throw new Error('Payment verification failed: ' + error.message);
    }
  }

  // Fetch all payments from the repository
  async findAllPayments() {
    try {
      const payments = await PaymentRepository.fetchAllPayments();
      return payments;
    } catch (error) {
      console.error('Error in getAllpayments:', error);
      throw new Error(`Failed to fetch all payments: ${error.message}`);
    }
  }
}
export default new PaymentController();
