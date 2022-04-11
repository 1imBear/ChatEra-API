import "dotenv/config"
import "regenerator-runtime";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";


const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_CLIENT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
      maxPoolSize: 20
    });
    console.log('Database connection successful')
  } catch (error) {
    console.error('Database connection error')
  }
} 

export default {
  connect
}
