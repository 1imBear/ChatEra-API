import "dotenv/config"
import cors from "cors";
import express from "express";
import userAuth from "./auth";
import routers from "./routers"

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', userAuth);

app.use('/chat/user', routers.userAPI);
/*
    TODO: Handle root directory
*/

app.listen(
    process.env.PORT,
    () => console.log(`App's alive on http://${process.env.HOST_NAME}:${process.env.PORT}`)
);
