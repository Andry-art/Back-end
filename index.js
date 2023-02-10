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

dotenv.config();
const DB_URL = process.env.DB_URL;
const PORT = 4000;
const appExp = express();
const { app } = expressWs(appExp);

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       connectSrc: ["'self'", 'http://localhost:4000/'],
//     },
//   }),
// );
app.ws('/', (ws, res) => {
  ws.on('message', async (data) => {
    await userInfoService.postNewSteps(data)
  });
  ws.send('done')
});
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
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
  } catch (e) {
    console.log(e);
  }
};

startApp();