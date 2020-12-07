const express = require("express");
const app = express();

let broadcaster;
const port = 5050;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {path: '/foo/bar'});
app.use(express.static(__dirname + "/public"));

io.sockets.on("error", e => console.log(e));
io.sockets.on("connection", socket => {

  console.log(`Socket ${socket.id} connected`);

  /* Chat handling */

  socket.on("chatMessage", (data) => {
    const { messageObj, room } = data
    console.log(`Chat message : ${{messageObj}}`)
    io.to(room).emit('chatMessage', messageObj);
  });

  /* WebRTC signaling */
  socket.on("broadcaster", () => {
    broadcaster = socket.id;
    console.log(`${broadcaster} will be broadcaster`)
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
  });
  socket.on("offer", (id, message) => {
    console.log("offer")
    socket.to(id).emit("offer", socket.id, message);
  });
  socket.on("answer", (id, message) => {
    console.log("offer")
    socket.to(id).emit("answer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    console.log("candidate")
    socket.to(id).emit("candidate", socket.id, message);
  });

  /* WebRTC + chat */

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining stream ${room}`);
    socket.join(room);
 });

  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });
  
});
server.listen(port, () => console.log(`Server is running on port ${port}`));
