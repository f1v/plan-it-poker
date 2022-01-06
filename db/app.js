const express = require("express");
const app = express();
const port = 4000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const users = [];

// const formatUserValues = user => ({
//   username: user,
//   vote: null,
// })

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('username', u => {
    if (!users.find(user => user.userId === u.userId)) {
      users.push(u);
    }
    io.emit('users', users);
  })

  socket.on('vote', (obj) => {
    const userIndex = users.findIndex(user => user.userId === obj.userId);
    if (userIndex !== -1) {
      users[userIndex].vote = obj.vote;
    } else {
      users.push(obj);
    }
    console.log('users', users);
    io.emit('vote', users);
  });

  socket.on('cards flipped', (msg) => {
    io.emit('cards flipped', msg);
  });

  socket.on('reset', () => {
    users.forEach(u => u.vote = null)
    io.emit('reset', users);
    io.emit('cards flipped', false)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
