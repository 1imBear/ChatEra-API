import "dotenv/config"
import "regenerator-runtime";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";


const connect = async () => {
  mongoose.connect(process.env.MONGODB_CLIENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
    maxPoolSize: 20
  }, (error) => {

    if(error)
      console.error('Database connection error')
    else
      console.log('Database connection successful')
  });
} 

export default {
  connect
}
