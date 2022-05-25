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
      maxPoolSize: 20,
      connectTimeoutMS: 1000,
      keepAlive: true, 
      keepAliveInitialDelay: 300000
    }, function(err, db) {
      if (err) {
          console.log(`\n\x1b[40,31mUnable to connect to MongoDB server\x1b[0m`);
      } else {
          console.log('\n\x1b[0;32mConnected to MongoDB successfully!\x1b[0m');
      }
  });
  } catch (error) {
    console.error('\n\x1b[40,31mDatabase configuration error\x1b[0m')
  }

} 

export default {
  connect
}
