// Controller to handle user registration and fetching users
import UserRepository from '../repository/userRepository.js';
import userValidationSchema from '../requests/userRequest.js';
import userRepository from '../repository/userRepository.js';
import minioClient from '../../../../config/minioConfig/minioConfig.js';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
dotenv.config();

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
      const hashedPassword = user.password;
      const isPasswordValid = CryptoJS.SHA256(password).toString() === hashedPassword;
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

  async uploadImage(file) {
    const bucketName = 'profilepic';
    const objectName = `user-images/${file.name}`; 
  
    return new Promise((resolve, reject) => {
      minioClient.putObject(bucketName, objectName, file.data, file.size, (err, etag) => {
        if (err) {
          return reject(err);
        }
        // Return the public URL of the uploaded image
        const imageurl = `${minioClient.protocol}://${minioClient.endPoint}/${bucketName}/${objectName}`;
        resolve(imageurl);
        console.log(imageurl);
      });
    });
  }

  async updateProfile(id, name, email, phone, city, state, country, pincode, file) {
    let imageurl = null;
  
    // Upload the image if a file is provided
    if (file) {
      try {
        imageurl = await uploadImage(file);
      } catch (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
    }
  
    // Update user profile in the database
    const updatedUser = await userRepository.updateUser(id, name, email, phone, city, state, country, pincode, imageurl);
    return updatedUser;
  }

}

export default new UserController();
