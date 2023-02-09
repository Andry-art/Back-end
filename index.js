import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRouter from './src/routers/authRoute.js';
import userInfoRoute from './src/routers/userInfoRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import errorMiddleware from './src/middleware/error-middleware.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongodb from 'mongodb';
import MongoAdapter from '@socket.io/mongo-adapter';
import HistoryOfSteps from './src/models/HistoryOfSteps.js';

dotenv.config();
const DB_URL = process.env.DB_URL;
const PORT = 4000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const mongo = mongodb.MongoClient;
mongo.connect(DB_URL, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  const db = client.db('db');
  const adapter = new MongoAdapter(db);
  io.adapter(adapter);

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
app.use(errorMiddleware);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true });
    httpServer.listen(PORT, () => console.log('Server started on port ' + PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();
