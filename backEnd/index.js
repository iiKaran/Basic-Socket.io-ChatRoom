const express = require('express');
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});
// send throught the io and list on socket
io.on("connection", (socket) => {
    // ...
    socket.on("chat", (...payload) => {
       io.emit("chat", payload[0])
    })


});

httpServer.listen(8000, () => {
    console.log("Server listening on")
});
