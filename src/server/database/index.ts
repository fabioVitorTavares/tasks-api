import { MongoClient } from 'mongodb';
import 'dotenv/config';


const client = new MongoClient(process.env.URL_MONGO_DB as string);


export { client };







