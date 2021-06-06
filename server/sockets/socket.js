const socketio = require("socket.io");

module.exports = function (server) {
    const io = socketio(server, {
        cors: {
            origin: "*"
        }
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
}