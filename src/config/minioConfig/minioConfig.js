import { Client as Minio } from 'minio';

const minioClient = new Minio({
    endPoint: '127.0.0.1',           
    port: 9000,                        
    useSSL: false,                      
    accessKey: process.env.ACCESS_KEY,      
    secretKey: process.env.SECRET_KEY      
});

export default minioClient;