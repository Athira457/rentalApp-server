// payment controller
import paymentRepository from '../repository/paymentRepository';

class PaymentController {

  async processPayment(bookingId, razorpayPaymentId, razorpayOrderId, razorpaySignature) {
    return await paymentRepository.processPayment(bookingId, razorpayPaymentId, razorpayOrderId, razorpaySignature);
  }

}
export default new PaymentController();
