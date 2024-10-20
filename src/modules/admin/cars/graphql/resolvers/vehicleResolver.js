import VehicleRepository from '../../repositories/carRepository.js';
import { GraphQLUpload } from 'graphql-upload';
import minioClient from '../../../../../config/minioConfig/minioConfig.js'; 

const vehicleRepository = new VehicleRepository();

const resolvers = {
  
  Query: {
    getVehicleById: async (_, { id }) => {
      try {
        // Get vehicles from database using id
        const vehicle = await vehicleRepository.findById(id);
        if (!vehicle) {
          throw new Error('Vehicle not found');
        }
        return vehicle;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
    //get all vehicles from database
    getAllVehicles: async () => {
      return await vehicleRepository.findAll();
    },
  },
  Upload: GraphQLUpload,
  Mutation: {
    createVehicle: async (_, { name, model, description, price, quantity, image, images }) => {
      const imagePaths = [];

      // Handle single image upload
      if (image) {
        const { createReadStream, filename, mimetype } = await image;
        const stream = createReadStream();

        // Upload to MinIO
        await minioClient.putObject('vehicle', filename, stream, {
          'Content-Type': mimetype || 'application/octet-stream',
        });

        // Get the presigned URL
        const pimage = await minioClient.presignedGetObject('vehicle', filename);
        imagePaths.push(pimage);   
      }

      // Handle multiple images upload
      if (images && images.length > 0) {
        for (const img of images) {
          const { createReadStream, filename, mimetype } = await img;
          const stream = createReadStream();

          // Upload to MinIO
          await minioClient.putObject('vehicle', filename, stream, {
            'Content-Type': mimetype || 'application/octet-stream',
          });

          // Get the presigned URL
          const presignedUrl = await minioClient.presignedGetObject('vehicle', filename);
          imagePaths.push(presignedUrl);
        }
      }

      // Create the vehicle object
      const newVehicle = {
        name,
        model,
        description,
        price,
        quantity,
        image: imagePaths[0] || null,  
        images: imagePaths,  
      };

      // Save vehicle to repository
      const newImage = await vehicleRepository.create(newVehicle);

      return newImage;
    },
// Update vehicle object with new data
    updateVehicle: async (_, { id, name, description, price, quantity }) => {
      const vehicle = await vehicleRepository.findById(id);
      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      const updatedVehicle = {
        name: name || vehicle.name,
        description: description || vehicle.description,
        price: price || vehicle.price,
        quantity: quantity || vehicle.quantity,
      };

      // Update vehicle in repository
      const updated = await vehicleRepository.update(id, updatedVehicle);
      return updated;
    },
  }
};

export default resolvers;
