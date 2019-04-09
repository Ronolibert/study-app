require('dotenv').config({ path: '.env' });
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const createServer = require('./createServer');

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});
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
