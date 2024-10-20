import pool from '../../../../config/DBconnect/db.js';

class ManuRepository {
    // Inserting manufacturers into the database
    async createManufacturers(manufacturerData) {
        const { name } = manufacturerData;
        const query = `
            INSERT INTO manufacturers (name)
            VALUES ($1) RETURNING *`;
        const values = [name];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

      // Inserting models into the database with corresponding manufacturer id
      async createModels(modelData) {
        const { model_name, manufacturer_id } = modelData;
        const query = `
            INSERT INTO models (model_name, manufacturer_id)
            VALUES ($1, $2) RETURNING *`;
        const values = [model_name, manufacturer_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Fetch all manufacturers
    async getAllManufacturers() {
        const query = `
            SELECT * FROM manufacturers;
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    // Fetch all models
    async getAllModels(manufacturer_id) {
        const query = `
            SELECT * FROM models WHERE manufacturer_id = $1;
        `;
        const result = await pool.query(query, [manufacturer_id]);
        return result.rows;
    }
}

export default new ManuRepository();
