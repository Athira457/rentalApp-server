// book resolver handles graphql operation
import BookController from '../../controller/bookController.js';

const resolvers = {
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
