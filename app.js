// Riferimenti agli elementi HTML
const trackSelect = document.getElementById('trackSelect');
const audioPlayer = document.getElementById('audioPlayer');

// Aggiorna il player audio quando viene selezionata una nuova canzone
trackSelect.addEventListener('change', () => {
  const selectedTrack = trackSelect.value; // Ottiene il valore della traccia selezionata
  audioPlayer.src = selectedTrack; // Imposta la traccia nel player audio
  audioPlayer.load(); // Ricarica il player con la nuova traccia
  audioPlayer.play(); // Avvia la riproduzione automatica (opzionale)
});