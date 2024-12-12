import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
const PORT = 3000;

app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});