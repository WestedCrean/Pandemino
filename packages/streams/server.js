const express = require("express");
const app = express();

let rooms = {}
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
  socket.on("broadcaster", (roomId) => {
    console.log(`${socket.id} will be broadcaster for room ${roomId}`)
    if ( rooms[roomId] ) {
      rooms[roomId] = { broadcaster: socket.id, ...rooms[roomId]}
    } else {
      console.log(" no such room")
      rooms[roomId] = { broadcaster: socket.id, viewers: []}
    }
    socket.broadcast.emit("broadcaster");

    
  });
  socket.on("watcher", (roomId) => {
    if ( rooms[roomId] ) {
      const { broadcaster } = rooms[roomId]
      socket.to(broadcaster).emit("watcher", socket.id);
    }
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

<<<<<<< HEAD
  socket.on('join', (roomId) => {
    console.log(`Socket ${socket.id} joining stream ${roomId}`);
    if( rooms[roomId]) {
      rooms[roomId].viewers.push(socket.id)
    } else {
      rooms[roomId] = { broadcaster: null, viewers: [socket.id]}
    }
    
    socket.join(roomId);
=======
  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining stream ${room}`);
    socket.join(room);
>>>>>>> master
 });

  socket.on("disconnect", () => {
    Object.keys(rooms).forEach((roomId) => {
      if(rooms[roomId].viewers.find((id) => id === socket.id)) {
        if(rooms[roomId].broadcaster) {
          socket.to(rooms[roomId].broadcaster).emit("disconnectPeer", socket.id);
        }
      }
    })
    
  });
  
});
server.listen(port, () => console.log(`Server is running on port ${port}`));
