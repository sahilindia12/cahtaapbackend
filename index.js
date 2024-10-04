const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');  // Import cors middleware

const app = express();
const port=5500
// Use cors middleware to allow requests from specific origins
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL (React Native App)
  methods: ['GET', 'POST'],
  credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('message', (msg,) => {
    console.log('Received message:', msg);
    io.emit('message', `Server says: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(` this server run this port ${port}`);
});
