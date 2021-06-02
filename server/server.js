const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {v4: uuidV4} = require("uuid");

app.use(express.static(path.join(__dirname, '../client')));

app.get("/start", (req, res) => {
    res.redirect("/" + uuidV4())
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

io.on("connection", socket => {
    socket.on("join-room", (roomId, userId) => {
        console.log("user joined room", userId);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-joined", userId);
        socket.on("disconnect", () => {
            console.log("user disconnected", userId);
           socket.broadcast.to(roomId).emit("user-disconnected", userId);
        });
    });
});

server.listen(3000);