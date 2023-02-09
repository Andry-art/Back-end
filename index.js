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
import { MongoClient } from 'mongodb';
import { createAdapter } from '@socket.io/mongo-adapter'

dotenv.config();
const DB_URL = process.env.DB_URL;
const PORT = 4000;
const COLLECTION = "socket.io-adapter-events";
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

const mongoClient = new MongoClient("mongodb://localhost:27017/?replicaSet=rs0", {
  useUnifiedTopology: true,
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
  await mongoClient.connect();
  try {
    await mongoClient.db(DB_URL).createCollection(COLLECTION, {
      capped: true,
      size: 1e6
    });
    mongoose.set('strictQuery', true);
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
  } catch (e) {
    console.log(e);
  }
  const mongoCollection = mongoClient.db(DB_URL).collection(COLLECTION);

  io.adapter(createAdapter(mongoCollection));
  io.listen(3000);
};

startApp();
