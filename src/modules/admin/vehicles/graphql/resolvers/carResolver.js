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
    searchVehicles: async (_, { searchTerm, priceRange }) => {
      const { min, max } = priceRange;
      return await VehicleController.searchVehicles({
        searchTerm,
        minPrice: min,
        maxPrice: max,
      });
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
  },

  Upload: GraphQLUpload,
};

export default resolvers;
