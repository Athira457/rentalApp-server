import ManuRepository from '../../repository/manufactureRepository.js';

const resolvers = {
  Query: {
      GetManufacturers: async () => {
        return await ManuRepository.getAllManufacturers();
      },
      GetModels: async (parent, { manufacturer_id }) => {
        return await ManuRepository.getAllModels(manufacturer_id);
      },
  },

  Mutation: {
    registerManufacture: async (_, { name}) => {
        const Data = { name };
        return await ManuRepository.createManufacturers(Data);
      },
      registerModels: async(_, {model_name, manufacturer_id}) => {
        const modelData = {model_name,manufacturer_id};
        return await ManuRepository.createModels(modelData);
      }
  },
};

export default resolvers;
