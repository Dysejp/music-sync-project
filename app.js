const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const audioPlayer = document.getElementById('audioPlayer');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Previene il comportamento predefinito del form

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Errore durante il caricamento del file');
    }

    const data = await response.json();

    // Aggiorna il player audio con il percorso del file caricato
    audioPlayer.src = `/uploads/${data.file}`;
    audioPlayer.load(); // Carica il nuovo file nel player
    audioPlayer.play(); // Avvia la riproduzione automatica
  } catch (err) {
    console.error('Errore durante il caricamento del file:', err);
  }
});