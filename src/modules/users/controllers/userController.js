import UserRepository from '../repository/userRepository.js';
import userValidationSchema from '../requests/userRequest.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

// Controller to handle user registration and fetching users
class UserController {
  // Controller method to get all users
  async getAllUser(req, res) {
    try {
      const users = await UserRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  }

  async getUserDetails(id){
    try {
      const userDetails = await UserRepository.getUserDetailsById(id);
      return userDetails;
    } catch (error) {
      throw new Error(`Unable to fetch user details: ${error.message}`);
    }
  }

  // Controller method to handle user registration
  async registerUser(req, res) {
    try {
      // Validate the request body using Joi
      const { error } = userValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      // If validation passes, create the user
      const newUser = await UserRepository.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }

  // Controller method to login user
  async loginUser(email, password) {
    try {
      // Find the user by email
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', {
        expiresIn: '1h',
      });

      const data = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      };   
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new UserController();
