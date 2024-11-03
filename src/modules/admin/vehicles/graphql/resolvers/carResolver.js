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

    updateImagesByVehicleId: async (_, { images, isprimary, vehicleid }) => {
      return await VehicleController.updateImagesByVehicleId(images, isprimary, vehicleid);
    },

     // Resolver for updating the vehicle
    updateVehicleNew: async (_, {  id, price, quantity, description }) => {
      return await VehicleController.updateVehicleNew(id,price, quantity, description);
    },

    // Delete vehicle by its id
    deleteVehicleNew: async (_, { id }) => {
      return await VehicleController.deleteVehicleNew(id);
    },

    // Delete images by vehicle id
    deleteImages: async (_, { vehicleid }) => {
        const deletedImages = await VehicleController.deleteImages(vehicleid);
        return deletedImages;
    },
    
    reduceVehicleQuantity: async (_,{ id }) => {
      const reducecar = await VehicleController.reduceVehicleQuantity(id);
      return reducecar;
    },

  },

  Upload: GraphQLUpload,
};

export default resolvers;
