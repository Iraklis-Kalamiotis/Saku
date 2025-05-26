// index.ts
import Database from './src/database/mongoose';
import { SakuClient } from './src/SakuClient';
import dotenv from 'dotenv';

dotenv.config();


(async () => {
  const client = new SakuClient(SakuClient.getClientOptions());
  client.start();
  client.loadEvents()
//   const db = new Database(process.env.MONGO_URI || 'mongodb://localhost:27017/saku', client);
//   await db.connect();

})();