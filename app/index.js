import "dotenv/config"
import cors from "cors";
import express from "express";
import https from "https";
import userAuth from "./auth";
import routers from "./routers"
import path from "path"
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/', (res, req) => {
//     const requestStart = Date.now();

//     let errorMessage = null;
//     let body = [];
//     req.on("data", chunk => {
//       body.push(chunk);
//     });
//     req.on("end", () => {
//       body = Buffer.concat(body);
//       body = body.toString();
//     });
//     req.on("error", error => {
//       errorMessage = error.message;
//     });
  
//     res.on("finish", () => {
//       const { rawHeaders, httpVersion, method, socket, url } = req;
//       const { remoteAddress, remoteFamily } = socket;
  
//       console.log(
//         JSON.stringify({
//           timestamp: Date.now(),
//           processingTime: Date.now() - requestStart,
//           rawHeaders,
//           body,
//           errorMessage,
//           httpVersion,
//           method,
//           remoteAddress,
//           remoteFamily,
//           url
//         })
//       );
//     });
  
//     process(res, req);
// })

app.use('/auth', userAuth);

app.use('/chat/user', routers.userAPI);
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
    // pfx: fs.readFileSync(path.join("cert", "cert.pfx")) 
}, app);

sslServer.listen(
    process.env.PORT,
     () => console.log(`SSL Server is on port : ${process.env.PORT}`)
     )