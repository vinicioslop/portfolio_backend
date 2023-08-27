import express = require('express');
import mongoose = require('mongoose');

import routes from './routes';

const app = express();
const URI = process.env.URI ?? "mongodb://localhost/portfoliodata";
const PORT = process.env.PORT ?? 3000;

// LOCAL DOCKER: mongodb://localhost/portfoliodata
// CLOUD: mongodb+srv://portfolio:portfolio@cluster0.vr2qnaw.mongodb.net/?retryWrites=true&w=majority

app.use(express.json());

mongoose.connect(URI, { dbName: 'portfolio' });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.use(routes); // Use the routes
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;