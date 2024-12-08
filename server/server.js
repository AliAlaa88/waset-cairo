import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {Client, neonConfig} from '@neondatabase/serverless'
import ws from 'ws'

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

dotenv.config();

neonConfig.webSocketConstructor = ws;
const client = new Client(process.env.DATABASE_URL);
client.neonConfig.webSocketConstructor = ws;

(async () => {
    try {
        await client.connect();
        console.log('Connected to Neon PostgreSQL database successfully!');
    } catch (err) {
        console.error('Error connecting to Neon database:', err);
    }
})();


app.get('/api/users', async (req, res) => {
    try {
        const result = await client.query();
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});

//close db connection on server shutdown
process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await client.end();
    process.exit();
});