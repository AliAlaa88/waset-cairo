import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.route.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});