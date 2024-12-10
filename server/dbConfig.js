import {Client, neonConfig} from '@neondatabase/serverless'
import ws from 'ws'
import dotenv from 'dotenv';

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


//close db connection on server shutdown
process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await client.end();
    process.exit();
});

export default client;