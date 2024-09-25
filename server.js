const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file.filename });
});

io.on('connection', (socket) => {
  console.log('Nuovo utente connesso');

  socket.on('play', (data) => {
    socket.broadcast.emit('play', data);
  });

  socket.on('pause', () => {
    socket.broadcast.emit('pause');
  });

  socket.on('seek', (time) => {
    socket.broadcast.emit('seek', time);
  });
});

server.listen(3000, () => {
  console.log('Server attivo su http://localhost:3000');
});