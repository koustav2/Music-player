
document.addEventListener('DOMContentLoaded', function () {
    // Get HTML elements
const audio = document.querySelector('audio');
const musicCover = document.querySelector('.music-cover img');
const musicTitle = document.querySelector('.music-info h2');
const musicArtist = document.querySelector('.music-info h3');
const progressBar = document.querySelector('.progress');
const playButton = document.querySelector('.play');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const timeElapsed = document.getElementById('timeElapsed');
const durationDisplay = document.getElementById('duration');

// Define song data
const songs = [
    {
        cover: 'images/cover-1.png',
        title: 'Lost in the City Lights',
        artist: 'Cosmo Sheldrake',
        src: 'music/lost-in-city-lights-145038.mp3'
    },
    {
        cover: 'images/cover-2.png',
        title: 'Forest Lullaby',
        artist: 'Lesfm',
        src: 'music/forest-lullaby-110624.mp3'
    }
];

// Set initial song
let currentSongIndex = 0;
updateSong();

// Add event listeners
progressBar.addEventListener('mousedown', handleProgressBarClick);
playButton.addEventListener('click', handlePlayButtonClick);
prevButton.addEventListener('click', handlePrevButtonClick);
nextButton.addEventListener('click', handleNextButtonClick);

// Define event handlers
function handleProgressBarClick(event) {
    const progressBarRect = progressBar.getBoundingClientRect();
    const progress = (event.clientX - progressBarRect.left) / progressBarRect.width;
    audio.currentTime = audio.duration * progress;
}

function handlePlayButtonClick() {
    audio.paused ? audio.play() : audio.pause();
    updatePlayButton();
}

function handlePrevButtonClick() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSong();
}

function handleNextButtonClick() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSong();
}

function updateSong() {
    const song = songs[currentSongIndex];
    audio.src = song.src;
    musicCover.src = song.cover;
    musicTitle.textContent = song.title;
    musicArtist.textContent = song.artist;
    audio.play();
    updatePlayButton();
}

function updatePlayButton() {
    playButton.innerHTML = audio.paused ? '<img src="images/play_fill.svg" alt="play">' : '<img src="images/pause.svg" alt="pause">';
}

// Update progress bar and time displays as audio plays
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;

    // Actualiza el tiempo transcurrido
    const elapsedMinutes = Math.floor(audio.currentTime / 60);
    const elapsedSeconds = Math.floor(audio.currentTime % 60);
    timeElapsed.textContent = `${elapsedMinutes}:${elapsedSeconds}`;

    // Actualiza la duración total
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    durationDisplay.textContent = `${totalMinutes}:${totalSeconds}`;
});

// Reset progress bar and time displays when song ends
audio.addEventListener('ended', () => {
    progressBar.style.width = '0%';
    timeElapsed.textContent = '0:00';
});
});