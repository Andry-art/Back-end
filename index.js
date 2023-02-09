import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRouter from './src/routers/authRoute.js';
import userInfoRoute from './src/routers/userInfoRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import errorMidleware from './src/middleWare/error-middleware.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import HistoryOfSteps from './src/models/HistoryOfSteps.js';

dotenv.config();
const DB_URL = process.env.DB_URL;
const PORT = 4000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
io.on('connection', (socket) => {
  socket.on('message', async (data) => {
    const query = { userId: data.userId, date: data.date };
    const update = { steps: data.steps, tokens: data.tokens };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    await HistoryOfSteps.findOneAndUpdate(query, update, options, (error, message) => {
      if (error) {
        console.error(error);
      } else {
        console.log('message');
      }
    });
  });
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      connectSrc: ["'self'", 'http://localhost:4000/'],
    },
  }),
);

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
    httpServer.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
    // app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();
