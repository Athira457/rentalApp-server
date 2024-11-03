// vehicle Repositories handles database connections
import pool from '../../../../config/DBconnect/db.js';

class VehicleRepository {
  // Function to add a new vehicle
  async addVehicle(vehicleData) {
    const { manufacturer, model, name, description, price, quantity, seats, fuel, gear } = vehicleData;

    try {
      const vehicleResult = await pool.query(
        `INSERT INTO vehicletbl (manufacturer, model, name, description, price, quantity, seats, fuel, gear)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [manufacturer, model, name, description, price, quantity, seats, fuel, gear]
      );
      const carData = vehicleResult.rows[0];
      return carData;
    } catch (err) {
      console.error('Error adding vehicle:', err); 
      throw new Error('Failed to add vehicle');
    }
  }

  // Function to add images for a vehicle
  async addImages(images) {
    const { image, isprimary, vehicleid } = images;
    
    try {
        const imageResult =await pool.query(
          `INSERT INTO imagetbl (images, isprimary, vehicleid)
          VALUES ($1, $2, $3) RETURNING *`,
          [image, isprimary, vehicleid]
        );
        return imageResult.rows[0];
    } catch (err) {
      console.error('Error adding images:', err);
      throw new Error('Failed to add vehicle images');
    }
  }

  //find all vehicles
  async findAllVehicles() {
    const query = 'SELECT * FROM vehicletbl';
    const result = await pool.query(query);
    return result.rows;
  }

  //searching vehicle details by using id  
  async findByIdVehicle(id) {
    const query = 'SELECT * FROM vehicletbl WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  //find all images details
  async findAllImages() {
    const query = 'SELECT * FROM imagetbl';
    const result = await pool.query(query);
    return result.rows;
  }

  //searching image details by using id  
  async findByIdImage(id) {
    const query = 'SELECT * FROM imagetbl WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows;
  }

  //Fetch primary image by vehicle id
  async getPrimaryImageByVehicleId(vehicleid) {
    const query = 'SELECT * FROM imagetbl WHERE vehicleid = $1 AND isprimary = true';
    const result = await pool.query(query, [vehicleid]);
    return result.rows[0];
  }

  //fetch other images by using vehicle id
  async getSecondaryImageByVehicleId(vehicleid) {
    const query = 'SELECT * FROM imagetbl WHERE vehicleid = $1 AND isprimary = false';
    const result = await pool.query(query, [vehicleid]);
    return result.rows;
  }

  //update vehicle by id
  async updateVehicleNew(id, price, quantity, description ) {
    const query = `
      UPDATE vehicletbl
      SET price = $1, quantity = $2, description = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [price, quantity, description, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  };

  async deleteVehicle(id) {
    const query = 'DELETE FROM vehicletbl WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result;
  }

  async deleteImagesByVehicleId(vehicleid) {
    const query = 'DELETE FROM imagetbl WHERE vehicleid = $1 RETURNING *';
    const result = await pool.query(query, [vehicleid]);
    return result.rows;
  }

  async reduceVehicleQuantity(id){
    const query = 'UPDATE vehicletbl SET quantity = quantity - 1 WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

}

export default new VehicleRepository();
