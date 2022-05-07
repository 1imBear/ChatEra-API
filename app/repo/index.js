import "dotenv/config"
import "regenerator-runtime";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";


const connect = async () => {
  try {
    // mongoose.connection.on('connecting', () => { 
    //   console.log('mongodb is connecting')
    // });
    // mongoose.connection.on('connected', () => {
    //   console.log('mongodb is connected');
    // });
    // mongoose.connection.on('disconnecting', () => {
    //   console.error('mongodb is disconnecting');
    // });
    // mongoose.connection.on('disconnected', () => {
    //   console.error('mongodb is disconnected');
    // });

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
          console.log(`%c Unable to connect to MongoDB server`);
      } else {
          console.log('\x1b[0;32mConnected to MongoDB successfully!\x1b[0m');
      }
  });
  } catch (error) {
    console.error('\nDatabase configuration error')
  }

} 

export default {
  connect
}
