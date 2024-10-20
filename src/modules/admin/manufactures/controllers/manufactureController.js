import ManuRepository from '../repository/manufactureRepository.js';
import ManuValidation from '../requests/manufactureRequest.js';

class ManuController {
    // Create a new manufacturer
    async createManufacturer(req, res) {
        try {
            // Validate the request
            const { error } = ManuValidation.validateCreate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            // Insert data into manufacturers table
            const manufacturer = await ManuRepository.create(req.body);
            return res.status(201).json(manufacturer);
        } catch (err) {
            return res.status(500).json({ error: 'Server error' });
        }
    }

    // Get all manufacturers
    async getManufacturers(req, res) {
        try {
            const manufacturers = await ManuRepository.getAllManufacturers();
            return res.status(200).json(manufacturers);
        } catch (err) {
            return res.status(500).json({ error: 'Server error' });
        }
    }

    async getModels(req, res) {
        try {
            const { manufacturer_id } = req.params;
            const models = await ManuRepository.getAllModels();
            return res.status(200).json(models);
        } catch (err) {
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

// Exporting a singleton instance of the ManufacturerController class
export default new ManuController();
