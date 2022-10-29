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
const serverMessage = `it's alive on ${d_path}`

var today = new Date();
today.setTime(today.getTime() + (8 * 60 * 60 * 1000))

app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.get('/', (req, res) => {
    return res.send(serverMessage);
})
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ message: err.message, status: 404 });
    }
    next();
})
app.use('/auth', userAuth);
app.use('/user', routers.user)
app.use('/chat', routers.chat);
app.use('/message', routers.message);

const httpsServer = https.createServer({
    //passphrase: "123456",
    // pfx: fs.readFileSync(path.join("cert", "domain.pfx")),
    cert: fs.readFileSync(path.join("cert", "csr.pem")),
    key: fs.readFileSync(path.join("cert", "myserver.key")),
    ca: [
        fs.readFileSync(path.join("cert", "clientCA.crt")),
    ],
    //requestCert: true
}, app);

const io = new Server().listen(httpsServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
})

sockets(io);

httpsServer.listen(port, async () => {
    console.log(`\n\x1b[0;32m ${serverMessage} \x1b[0m;`);
    await db.connect();
    console.log(`\x1b[0m\n\x1b[0;36mStart time: ${today} \x1b[0m`);
});