import http from "http";
//import WebSocket from "ws";
import express from "express";
import SocketIO from "socket.io";


const app = express();

console.log("server start");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home")); 
app.get("/*", (req, res) => res.redirect("/"));


//http와 Websocket 서버 둘다 만들기
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket.on("enter_room", (msg, done) => {
        console.log(msg);
        setTimeout(() => {
            done();
        }, 10000);
    })
});

httpServer.listen(3000, () => console.log(`Listening on http://localhost:3000`));
/*
const wss = new WebSocket.Server( { server });
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    console.log("Connected to Browser ");
    socket.on("close", () => console.log("Disconntected Browser"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch(message.type){
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
                break;
            case "nickname":    
                socket["nickname"] = message.payload;
                break;
            default:
        }
    });
});
*/