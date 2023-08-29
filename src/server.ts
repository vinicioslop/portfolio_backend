import express from "express";
import mongoose from "mongoose";

import routes from './routes';

const app = express();
const URI: string = process.env.URI ?? "mongodb://localhost/portfoliodata";
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

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