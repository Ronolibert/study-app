require('dotenv').config({ path: '.env' });

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    },
    port: process.env.SERVER_PORT
  },
  _ => {
    console.log(`Server is now running on port http://localhost:${_.port}`);
  }
);
