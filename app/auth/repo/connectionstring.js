import "dotenv/config"
import "regenerator-runtime";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";


const client = async () => {
  mongoose.connect(process.env.MONGODB_CLIENT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
        maxPoolSize: 20
  }).then(() => {
      console.log('Database connection successful')
    })
    .catch(err => {
      console.error('Database connection error')
    })
} 

export default client;