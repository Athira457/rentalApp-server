// yourFile.js
import typesenseClient from '../typesenseConfig/typesenseConfig.js';

// Define vehicle schema
const vehicleSchema = {
  name: 'vehicles',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'manufacturer', type: 'string' },
    { name: 'model', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'price', type: 'float' },
    { name: 'quantity', type: 'int32' },
    { name: 'seats', type: 'string' },
    { name: 'fuel', type: 'string' },
    { name: 'gear', type: 'string' },
    { name: 'primaryImage', type: 'string' },
    { name: 'secondaryImages', type: 'string[]' },
  ],
  default_sorting_field: 'price',
};

// Creating the collection in Typesense

const createCollection = async () => {
  try {
    await typesenseClient.collections().create(vehicleSchema);
    console.log('Collection created successfully!');
  } catch (error) {
    console.error('Error creating collection:', error);
  }
}

export default createCollection;
