import  PaymentController from '../../controller/paymentController.js';

const resolvers = {
    Query:{
      getAllPayments: async () => {
        try {
          const payments = await PaymentController.findAllPayments();
          return payments.map(payments => ({
            id: payments.id,
            bookingId: payments.book_id,
            amount: payments.amount,
            status: payments.status,
          }));
        } catch (error) {
          throw new Error(`Failed to retrieve payments: ${error.message}`);
        }
      }
    },
    Mutation: {
        // Resolver to create a Razorpay order
        createOrder: async (_, { bookingId, amount }) => {
          return await PaymentController.createOrder(bookingId, amount);
        },
    
        // Resolver to verify Razorpay payment
        verifyPayment: async (_, { razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {  
          return await PaymentController.verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        },
      },
}
export default resolvers;