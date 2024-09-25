const socket = io();

const audioPlayer = document.getElementById('audioPlayer');
const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('fileInput');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  audioPlayer.src = `/uploads/${data.file}`;
});

// Sincronizzazione della riproduzione
audioPlayer.addEventListener('play', () => {
  socket.emit('play', { currentTime: audioPlayer.currentTime });
});

audioPlayer.addEventListener('pause', () => {
  socket.emit('pause');
});

audioPlayer.addEventListener('seeked', () => {
  socket.emit('seek', audioPlayer.currentTime);
});

socket.on('play', (data) => {
  audioPlayer.currentTime = data.currentTime;
  audioPlayer.play();
});

socket.on('pause', () => {
  audioPlayer.pause();
});

socket.on('seek', (time) => {
  audioPlayer.currentTime = time;
});