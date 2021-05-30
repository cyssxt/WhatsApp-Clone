import express from "express";
import expressWs from "express-ws";
import chatRouter from "./router/chatRouter";
import roomRouter from "./router/roomRouter";
import userRouter from "./router/userRouter";
import statusRouter from "./router/statusRouter";
import db from "./db/index";
import config from "config";
import cors from "cors";
import {createSocket} from "./controller/SocketConnections";
import {getUserId} from "./controller/authController";
import {getChats} from "./controller/ChatController";
import {getContacts} from "./controller/ContactController";
import {getUserInfo} from "./controller/UserInfoController";
import {getRecentMsg} from "./controller/UserMsgController";
// Express setup -----
const app = express();
expressWs(app);

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/room", roomRouter);
app.use("/api/status", statusRouter);
app.get("/getUserId", getUserId);
app.get("/contacts/:userId", getContacts);
app.get("/chats/:userId", getChats);
app.get("/getUserInfo/:userId", getUserInfo);
app.get("/getRecentMsg/:userId/:remoteJid", getRecentMsg);

const port = process.env.PORT || 3000;

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("privateKey")) {
  console.error("FATAL ERROR: privateKey is not defined.");
  process.exit(1);
}

app.get("/ping", (_req: any, res: { send: (arg0: string) => void }) => {
  res.send("pong");
});

// MongoDb setup -----
db.on("error", (error: any) => {
  console.log("Mongoose Connection Error : " + JSON.stringify(error));
});

// Socket.io setup -----
const http = require("http").Server(app);
http.listen(port, () => {
  console.log(`Socket is listening on port ${port}`);
});

createSocket(http);
