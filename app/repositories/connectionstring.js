import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config"

const client = new MongoClient(
            process.env.MONGODB_CLIENT, 
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1,
                maxPoolSize: 20
            });


export default client;