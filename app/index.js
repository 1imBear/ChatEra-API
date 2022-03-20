import "dotenv/config"
import cors from "cors";
import express from "express";
import routers from "./routers";
import userAuth from "./auth"

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', userAuth);

/*
    TODO: Handle root directory
*/

app.listen(
    process.env.PORT,
    () => console.log(`App's alive on http://${process.env.HOST_NAME}:${process.env.PORT}`)
);
