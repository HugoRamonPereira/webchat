const express = require('express');
const app = express();
const http = require('http');
const path = require('path')
const { Server } = require("socket.io");

const cors = require('cors')

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

const server = http.createServer(app)
const io = new Server(server);

const port = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('sender', (msg) => {
    socket.broadcast.emit('receive_broadcast', msg)
  })

  socket.on('disconect', () =>{
    console.log('user disconnected')
  })

})

server.listen(3000, () => {
  console.log('listening on *:3000');
})
