//carRepository file connect car registration form into database 
import pool from '../../../../config/DBconnect/db.js';

class VehicleRepository {
//insearting vehicles into database 
    async create(vehicleData) {
      const { name, model, description,  price, quantity, image, images } = vehicleData;
      const query = `
        INSERT INTO vehicles (name, model, description,  price, quantity, image, images)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [name, model, description,  price, quantity, image, images];
      const result = await pool.query(query, values);
      return result.rows[0];
    }

//find all vehicles
    async findAll() {
      const query = 'SELECT * FROM vehicles';
      const result = await pool.query(query);
      return result.rows;
    }

//searching vehicles by using id  
    async findById(id) {
      const query = 'SELECT * FROM vehicles WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    }
//updating vehicle details using its id  
    async update(id, vehicleData) {
      const { name, description,  price, quantity} = vehicleData;
      const query = `
        UPDATE vehicles 
        SET name = $1,  description = $2,  price = $3, quantity =$4 
        WHERE id = $5 RETURNING *`;
      const values = [name, description,  price, quantity, id];
      const result = await pool.query(query, values);
      return result.rows[0];
    }
//deleting vehicles using id 
    async delete(id) {
      const query = 'DELETE FROM vehicles WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    }
  }
  
export default VehicleRepository;