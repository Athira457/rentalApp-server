import VehicleRepository from '../repositories/carRepository.js';
import VehicleRequest from '../requests/carRequest.js';

class VehicleController {
  constructor() {
    this.vehicleRepository = new VehicleRepository();
  }

  //insert car details into database
  async createVehicle(req, res) {
    try {
      await VehicleRequest.validateVehicle(req.body);
      const vehicle = await this.vehicleRepository.create(req.body);
      return res.status(201).json(
        { message: 'Vehicle created successfully', vehicle }
    );
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

//search car details from database using id
  async getVehicleById(req, res) {
    try {
      const vehicle = await this.vehicleRepository.findById(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      return res.status(200).json(vehicle);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

//updating car details by id
  async updateVehicle(req, res) {
    try {
      await VehicleRequest.validateVehicle(req.body);
      const vehicle = await this.vehicleRepository.update(req.params.id, req.body);
      if (!vehicle) {

        return res.status(404).json(
            { message: 'Vehicle not found' }
        );
      }
      return res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

//delete cars using id
  async deleteVehicle(req, res) {
    try {
      const vehicle = await this.vehicleRepository.delete(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
      return res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default VehicleController;
