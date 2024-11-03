import  UserRepository from '../../repository/userRepository.js';
import UserController from '../../controllers/userController.js';
import { GraphQLUpload } from 'graphql-upload';
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
    // mutation to register new user
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

    // mutation to update existing user
    updateProfile: async (_, { id, name, email, phone, city, state, country, pincode, file }) => {
      try {
        console.log("file :",file);
        const updatedUser = await UserController.updateProfile(id, name, email, phone, city, state, country, pincode, file);
        console.log("update user:",updatedUser);
        return updatedUser;
      } catch (error) {
        throw new Error(`Error updating profile: ${error.message}`);
      }
    },

  },
  Upload: GraphQLUpload,
};

export default userResolvers;

