import * as dotenv from 'dotenv'
dotenv.config()

import { MongoClient,Db } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const dbName = process.env.DB_NAME||"";

const client = new MongoClient(connectionString);

let conn: MongoClient | undefined;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
  console.log(`\n\nYou must set the ATLAS_URI environment variable in the .env file`);
}
if (!conn) {
  throw new Error('Failed to connect to the database');
}
let db:Db = conn.db(dbName);

export default db;

export const closeConnection=()=>{
  conn?.close();
}
