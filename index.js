import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRouter from './src/routers/authRoute.js';
import userInfoRoute from './src/routers/userInfoRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import errorMidleware from './src/middleWare/error-middleware.js';
import expressWs from 'express-ws';
import userInfoService from './src/services/userInfo-service.js'
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();
const DB_URL = process.env.DB_URL;
const PORT = 4000;
const app = express();
const http = createServer(app);
const io = new Server(http);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      connectSrc: ["'self'", 'http://localhost:4000/'],
    },
  }),
);

io.on('connection', (socket) => {
  socket.on('message', async (data) => {
console.log(data, 'sdvsvs')
await userInfoService.postNewSteps(data);
  })
})
// app.ws('/socket', (ws, res) => {
//   ws.on('message', async (data) => {
//     console.log(data)
//     await userInfoService.postNewSteps(data);
//   });
// });
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter);
app.use('/data', userInfoRoute);
app.use(errorMidleware);

const startApp = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(DB_URL);
    // http.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();
