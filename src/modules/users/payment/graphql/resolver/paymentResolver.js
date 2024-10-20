import  PaymentRepository from '../../repository/paymentRepository.js';

const paymentResolvers = {
    Mutation: {
        processPayment: async (_, { bookingId, razorpayPaymentId, razorpayOrderId, razorpaySignature }) => {
            const result = await PaymentRepository.processPayment(bookingId, razorpayPaymentId, razorpayOrderId, razorpaySignature);
            return result;
        },
    }
}
export default paymentResolvers;