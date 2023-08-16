import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

mongoose.connect('mongodb://localhost/portfoliodata');

const app = express();

app.use(express.json());
app.use(routes);

const port: number = 3000;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});