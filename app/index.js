import "dotenv/config";
import cors from "cors";
import express from "express";
import https from "https";
import userAuth from "./auth";
import routers from "./routers";
import path from "path";
import fs from "fs";
import db from "./repo";
import Socket from "./plugin/socket.io"

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', userAuth);
app.use('/user', routers.user)
app.use('/chat', routers.chat);
app.use('/message', routers.message);
/*
    TODO: Handle root directory
*/

const sslServer = https.createServer({
    passphrase: "123456",
    key : fs.readFileSync(path.join("cert", "domain.key")),
    cert : fs.readFileSync(path.join("cert", "domain.crt")),
    ca : [
        fs.readFileSync(path.join("cert", "rootCA.crt")),
    ]
}, app);

Socket(sslServer);

sslServer.listen(process.env.PORT, async () => {
    console.log(`HTTPs : ${process.env.PORT} is on live `);
    await db.connect();
});