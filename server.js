const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configura Multer per salvare i file nella cartella 'uploads'
const upload = multer({ dest: 'uploads/' });

// Serve i file statici dalla cartella 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve i file caricati dalla cartella 'uploads'
app.use('/uploads', express.static('uploads'));

// Route per servire il file index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestione del caricamento dei file tramite Multer
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nessun file caricato');
  }
  res.json({ file: req.file.filename });
});

// Gestione della connessione WebSocket
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

// Imposta la porta per il server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});