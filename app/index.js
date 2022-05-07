import "dotenv/config";
import cors from "cors";
import express from "express";
import https from "https";
import userAuth from "./auth";
import routers from "./routers";
import path from "path";
import fs from "fs";
import db from "./repo";
import { Server } from "socket.io"
import sockets from "./plugin/socket"

const app = express();
const d_name = process.env.DOMAIN_NAME,
    d_port = process.env.DOMAIN_PORT,
    d_path = `https://${d_name}:${d_port}`,
    port = process.env.PORT;

var today = new Date();
today.setTime(today.getTime() + (8 * 60 * 60 * 1000))

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use('/auth', userAuth);
app.use('/user', routers.user)
app.use('/chat', routers.chat);
app.use('/message', routers.message);

const httpsServer = https.createServer({
    passphrase: "123456",
    pfx: fs.readFileSync(path.join("cert", "domain.pfx")),
    // key: fs.readFileSync(path.join("cert", "domain.key")),
    // cert: fs.readFileSync(path.join("cert", "domain.crt")),
    ca: [
        fs.readFileSync(path.join("cert", "rootCA.crt")),
    ],
    //requestCert: true
}, app);

const io = new Server().listen(httpsServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
})

//Main Socket
sockets(io);

// Socket io Test
//app.use(express.static(path.join(__dirname, 'view')));
// import socket2 from "./plugin/socket_test"
// socket2(io)

httpsServer.listen(port, async () => {
    console.log(`\n\x1b[0;32mHTTPs : ${port} is online \x1b[0m\n\x1b[0;36mStart time: ${today} \x1b[0m\n`);
    await db.connect();
});