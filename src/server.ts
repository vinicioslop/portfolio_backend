import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const PORT: number = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://portfolio:portfolio@cluster0.vr2qnaw.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.use('/api', routes); // Use the routes
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});