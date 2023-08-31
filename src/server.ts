import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

const app = express();
const URI: string = process.env.URI ?? "mongodb://localhost/portfoliodata";
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(URI, { dbName: 'portfolio' });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.use("/api", routes); // Use the routes
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;