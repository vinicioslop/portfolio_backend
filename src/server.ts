import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/portfoliodata');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Olá');
});

const port: number = 3000;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});