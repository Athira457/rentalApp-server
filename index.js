import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createUsersTable from './src/config/migrations/userTable.js';
import { graphqlUploadExpress } from 'graphql-upload';
import { ApolloServer } from 'apollo-server-express';
import { mergeSchemas } from '@graphql-tools/schema';
import userSchema from './src/modules/users/graphql/userSchema.js';
import vehicleSchema from './src/modules/admin/cars/graphql/schema.js'
import manuSchema from './src/modules/admin/manufactures/graphql/schema.js';
import carSchema from './src/modules/admin/vehicles/graphql/schema.js';
import bookSchema from './src/modules/users/book/graphql/schema.js';


dotenv.config();
const serverUrl = process.env.SERVER_URL;

// Initialize Express app
const app = express();
app.use(express.json());
app.use(graphqlUploadExpress({maxFileSize:10000000, maxFiles:10}));

// Set up CORS to allow requests from frontend
app.use(cors());
createUsersTable();


// Merge the schemas into one
const schemaNew = mergeSchemas({
  schemas: [vehicleSchema, userSchema, manuSchema, carSchema, bookSchema],
});

const apolloServer = new ApolloServer({
  schema: schemaNew,
  uploads: false,
});


// Start Apollo Server and integrate with Express
async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // Start the Express server
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at ${serverUrl}${apolloServer.graphqlPath}`);
  });
}

startApolloServer().catch((error) => {
  console.error('Error starting Apollo Server:', error);
});
