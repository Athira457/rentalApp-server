import pool from '../DBconnect/db.js';

const createUsersTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `;

  try {
    await pool.query(queryText); 
    console.log("Table 'users' created successfully.");
  } catch (err) {
    console.error("Error creating table 'users':", err);
  } 
};

export default createUsersTable;
