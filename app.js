/// Riferimenti agli elementi HTML
const trackSelect = document.getElementById('trackSelect');
const audioPlayer = document.getElementById('audioPlayer');

// Aggiorna il player audio quando viene selezionata una nuova canzone
trackSelect.addEventListener('change', () => {
  const selectedTrack = trackSelect.value;
  console.log('Traccia selezionata:', selectedTrack); // Log per il debug
  audioPlayer.src = selectedTrack; // Imposta la traccia nel player audio
  audioPlayer.load(); // Ricarica il player con la nuova traccia
  audioPlayer.play(); // Avvia la riproduzione automatica (opzionale)
});