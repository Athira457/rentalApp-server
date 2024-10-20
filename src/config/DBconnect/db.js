import pkg from 'pg';
const {Pool} =pkg;
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Pool instance using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Connect to PostgreSQL and log the status
pool.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to PostgreSQL!');
});

// Export the pool instance as the default export
export default pool;
