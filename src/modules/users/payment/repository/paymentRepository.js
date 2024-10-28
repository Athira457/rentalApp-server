import pool from '../../../../config/DBconnect/db.js';

class PaymentRepository {

  async insertPayment(bookingId, amount, status) {
    const query = `
      INSERT INTO paymenttbl (book_id, amount, status)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [bookingId, amount, status];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; 
    } catch (error) {
      console.error('Error inserting payment into database:', error);
      throw new Error('Database insertion error');
    }
  }

  async findByIdPaymeny(id) {
    const query = 'SELECT * FROM paymenttbl WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async fetchAllPayments(){
    const query = 'SELECT * FROM paymenttbl';
    const result = await pool.query(query);
    return result.rows;
  }

}
export default new PaymentRepository();