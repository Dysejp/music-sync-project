const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const upload = multer({ dest: 'uploads/' });

// Serve i file statici dalla cartella 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve il file index.html quando qualcuno visita la root '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});