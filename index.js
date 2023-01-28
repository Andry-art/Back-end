import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

const PORT = 4000;
const DB_URL = 'mongodb+srv://user:1234@cluster0.pc8ffsz.mongodb.net/?retryWrites=true&w=majority';
const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      connectSrc: ["'self'", 'http://localhost:5000/'],
    },
  }),
);

app.use(express.json());

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
