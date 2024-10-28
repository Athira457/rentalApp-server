import { GraphQLUpload } from 'graphql-upload';
import VehicleController from '../../controllers/vehicleController.js';

const resolvers = {
  Query: {
    //Query to get all vehicles
    getAllVehiclesNew: async () => {
      return await VehicleController.getAllVehicles();
    },
    
    //Query to get vehicle by id
    getVehicleImageById: async (_, { id }) => {
      return await VehicleController.getVehicleImageById(id);
    },
    
    //search vehicle by manufacturer or model and filter vehicle by price
    searchVehiclesByName: async (_, {searchTerm}) => {
      return VehicleController.searchVehiclesByName(searchTerm);
    },

    filterVehiclesByPrice: async (_, { minPrice, maxPrice }) => {    
      return VehicleController.filterVehiclesByPrice(minPrice, maxPrice);
    },
  },

  Mutation: {
    //Mutation to register vehicles
    registerVehicle: async (_, { manufacturer, model, name, description, price, quantity, seats, fuel, gear }) => {
      const vehicleData = { manufacturer, model, name, description, price, quantity, seats, fuel, gear };
      return await VehicleController.registerVehicle(vehicleData);
    },
    
    //Mutation to register images
    registerImages: async (_, { images, isprimary, vehicleid }) => {
      return await VehicleController.registerImages(images, isprimary, vehicleid);
    },

     // Resolver for updating the vehicle
    updateVehicleNew: async (_, { price, quantity, description }) => {
      return await VehicleController.updateVehicleNew(price, quantity, description);
    },
    // Resolver for updating the primary image
    updatePrimaryImage: async (_, { vehicleId, imageId }) => {
      return await VehicleController.updatePrimaryImage(vehicleId, imageId);
    },

    // Delete vehicle by id
    deleteVehicleNew: async (_, { id }) => {
      return await VehicleController.deleteVehicleNew(id);
    },

  },

  Upload: GraphQLUpload,
};

export default resolvers;
