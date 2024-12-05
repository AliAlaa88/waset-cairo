import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/', (req, res) => {
    res.json({"msg" : "Hello World"});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});