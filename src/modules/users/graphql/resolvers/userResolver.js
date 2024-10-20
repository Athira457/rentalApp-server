import  UserRepository from '../../repository/userRepository.js';
import UserController from '../../controllers/userController.js';
const userResolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      try {
        return await UserRepository.getAllUsers();
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    // Fetch a user by email
    getUserByEmail: async (_, { email }) => {
      try {
        return await UserRepository.getUserByEmail(email);
      } catch (error) {
        throw new Error('Error fetching user');
      }
    },
    //Fetch user details by id
    getUserDetails: async (_, { id }) =>{
      try {
        const userDetails = await UserController.getUserDetails(id);
        return userDetails;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  
  Mutation: {
    registerUser: async (_, { name, email, phone, city, state, country, pincode, password}) => {
      const newUser = await UserRepository.createUser({
        name,
        email,
        phone,
        city,
        state,
        country,
        pincode,
        password
      });

      return newUser;
    },
    loginUser: async (_, { email, password }) => {
      return await UserController.loginUser(email, password);
    },
  }
};

export default userResolvers;

