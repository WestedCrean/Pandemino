require('dotenv').config()
const express = require("express");
const app = express();

let rooms = {}
const port = 5050;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {path: '/foo/bar'});

const client = require("./db")
const admin = require("./firebase")

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
  socket.on("broadcaster", async (roomId, idToken) => {
    // check firebase token
    try { 
      const decodedToken = await admin.auth().verifyIdToken(idToken)
      const lecturerEmail = decodedToken.email;
      queryLectureData = `select c.id as "courseId", c."name" as "courseName", u.email as "lecturerEmail" from pandemino.public.courses c join users u on c."lecturerId" = u.id`
      const res = await client.query(queryLectureData)
      if ( res.rows[0] && res.rows[0].lecturerEmail === lecturerEmail) {
        console.log(`${socket.id} will be broadcaster for room ${roomId}`)
        
        if ( rooms[roomId] ) {
          console.log("room exists")
          rooms[roomId] = { broadcaster: socket.id, ...rooms[roomId]}
        } else {
          console.log("no such room")
          rooms[roomId] = { broadcaster: socket.id, viewers: []}
        }
        socket.broadcast.emit("broadcaster");
        return { status: 201, message: "OK"}
      } else {
        return { status: 404, message: "Lecture not found"}
      }
          
    } catch(error)  {
      return { status: 401, message: `Unauthorized access: ${error.message}`}
    }
  });
  socket.on("watcher", (roomId) => {
    if ( rooms[roomId] !== undefined) {
      const { broadcaster } = rooms[roomId]
      socket.to(broadcaster).emit("watcher", socket.id);
    } else {
      console.log("room does not exist")
    }
  })

  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
  });
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });

  /* WebRTC + chat */

  socket.on('join', (roomId) => {
    console.log(`Socket ${socket.id} joining stream ${roomId}`);
    if( rooms[roomId]) {
      rooms[roomId].viewers.push(socket.id)
      socket.join(roomId);
    }
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
