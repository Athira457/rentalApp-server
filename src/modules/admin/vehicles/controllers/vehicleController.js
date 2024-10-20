import vehicleRepository from '../repositories/vehicleRepository.js';
import minioClient from '../../../../config/minioConfig/minioConfig.js';
import typesenseClient from '../../../../config/typesenseConfig/typesenseConfig.js';

class VehicleController {
  constructor() {
    this.sharedData = null;
  }
  // Get all vehicles and their primary images
  async getAllVehicles() {
    const vehicles = await vehicleRepository.findAllVehicles();
    const vehiclesWithImages = await Promise.all(
      vehicles.map(async (vehicle) => {
        const primaryImage = await vehicleRepository.getPrimaryImageByVehicleId(vehicle.id);
        const secondaryImages = await vehicleRepository.getSecondaryImageByVehicleId(vehicle.id);
        return {
          ...vehicle,
          primaryimage: primaryImage ? { images: primaryImage.images } : null,
          secondaryimages: secondaryImages.length > 0 ? 
        secondaryImages.map((image) => ({ images: [image.images] })) : [] ,
        };
      })
    );
    return vehiclesWithImages;
  }

  // Get vehicle by ID and include secondary images
  async getVehicleImageById(id) {
    const vehicle = await vehicleRepository.findByIdVehicle(id);
    if (!vehicle) throw new Error(`Vehicle with ID: ${id} not found`);

    const secondaryImages = await vehicleRepository.getSecondaryImageByVehicleId(vehicle.id);
    const otherimg = { 
      ...vehicle, 
      secondaryimages: secondaryImages.length > 0 ? 
        secondaryImages.map((image) => ({ images: [image.images] })) : [] 
    };
    return otherimg;
  }

  // Register a new vehicle
  async registerVehicle(vehicleData) {
    this.sharedData = vehicleData;
    const carData = await vehicleRepository.addVehicle(vehicleData);
    return carData;
  }

  // Register images for a vehicle
  async registerImages(images, isprimary, vehicleid) {
    const imagePaths = [];
    let primaryImage = '';  
    const secondaryImages = [];  
    try {
        if (images && images.length > 0) {
          for (let index = 0; index < images.length; index++) {
            // Wait for the image promise to resolve
            const img = await images[index];
            const { createReadStream, filename, mimetype } = img;
            const stream = createReadStream();
            // Upload to MinIO
            await minioClient.putObject('vehicle', filename, stream, {
              'Content-Type': mimetype || 'application/octet-stream',
            });

            const presignedUrl = await minioClient.presignedGetObject('vehicle', filename);  
            imagePaths.push(presignedUrl);
    
            // Prepare data for the new image entry
            const newData = {
              image: presignedUrl,
              isprimary: index === isprimary ? true : false,
              vehicleid,
            };      
            await vehicleRepository.addImages(newData);
            if (newData.isprimary === true) {
              primaryImage = newData.image;
            } else {
              secondaryImages.push(newData.image);
            }
          }
        }  
        const typesenseData = {
          id: vehicleid,
          manufacturer: this.sharedData.manufacturer,
          model: this.sharedData.model,
          name: this.sharedData.name,
          description: this.sharedData.description,
          price: this.sharedData.price,
          quantity: this.sharedData.quantity,
          seats: this.sharedData.seats,
          fuel: this.sharedData.fuel,
          gear: this.sharedData.gear,
          primaryImage,
          secondaryImages,
        };
        await typesenseClient.collections('vehicles').documents().create(typesenseData);
    
        return imagePaths;
      } catch (error) {
        throw new Error(`Image registration failed: ${error.message}`);
      }
  }

  // Search vehicles using Typesense
  async searchVehicles({ manufacturer, model, minPrice, maxPrice }) {
    try {
      const searchQuery = {
        q: `${manufacturer || ''} ${model || ''}`.trim(),
        query_by: 'manufacturer,model',
        filter_by: `price:>=${minPrice} && price:<=${maxPrice}`,
      };

      const response = await typesenseClient.collections('vehicles').documents().search(searchQuery);
      return response.hits.map(hit => hit.document);
    } catch (error) {
      throw new Error(`Failed to fetch vehicles: ${error.message}`);
    }
  }
}

export default new VehicleController();
