
import fs from 'fs';
import path from 'path';
import { finished } from 'stream/promises';
import minioClient from '../minioConfig/minioConfig.js'; 

// Helper function to upload a single file to MinIO
export const uploadToMinio = async (file, folder) => {
  const { createReadStream, filename } = await file;
  
  // Using `process.cwd()` for cleaner path handling
  const tempFilePath = path.join(process.cwd(), filename); 
  
  // Save the file temporarily
  const stream = createReadStream();
  const writeStream = fs.createWriteStream(tempFilePath);
  stream.pipe(writeStream);
  await finished(writeStream);

  // Upload file to MinIO
  const objectName = `${folder}/${filename}`;
  await minioClient.putObject('vehicle', objectName, tempFilePath);

  fs.unlinkSync(tempFilePath);
  return objectName;
};

// Helper function to upload multiple files to MinIO
export const uploadMultipleToMinio = async (files, folder) => {
  return Promise.all(files.map(file => uploadToMinio(file, folder)));
};
