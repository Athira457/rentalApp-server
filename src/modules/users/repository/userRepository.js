// user repository file handles Queries into database
import pool from '../../../config/DBconnect/db.js';
import bcrypt from 'bcrypt';

class UserRepository {
  // Fetch all users from the database
  async getAllUsers() {
      const result = await pool.query('SELECT * FROM usermodel');
      return result.rows;
  }

  // Fetch user by using email
  async getUserByEmail(email) {
    try {
      const query = 'SELECT * FROM usermodel WHERE email = $1';
      const result = await pool.query(query, [email]);
      return result.rows[0]; 
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }

  // Get user details by using id
  async getUserDetailsById(id){
    try {
      const query = 'SELECT * FROM usermodel WHERE id = $1';
      const result = await pool.query(query, [id]);
  
      // Check if user exists
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
  
      return result.rows[0]; 
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }

  }

  // Insert a new user into the database
  async createUser(userData) {
    try {
      const { name, email, phone, city, state, country, pincode, password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO usermodel (name, email, phone, city, state, country, pincode, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [name, email, phone, city, state, country, pincode, hashedPassword]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

export default new UserRepository();