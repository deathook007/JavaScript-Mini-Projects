const container = document.getElementById('container');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const title = document.getElementById('musicTitle');
const cover = document.getElementById('cover');

const songTracks = ['Dil Ke Dastakk', 'Qismat Ki Hawa', 'Titliaan'];

let songIndex = 2;

//Funtions
function loadSong(song) {
    title.innerText = song;
    // audio.src = `images/${song}.mp3`; Not Working Why ?
    // Refrence: https://stackoverflow.com/questions/10792163/change-audio-src-with-javascript
    audio.setAttribute('src', 'music/' + song + '.mp3');
    cover.src = `images/${song}.jpg`;
}

// Initial load
loadSong(songTracks[songIndex]);

function playSong() {
    container.classList.add('play');
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    container.classList.remove('play');
    play.querySelector('i.fas').classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function nextSong() {
    songIndex++;
    if (songIndex > songTracks.length - 1) {
        songIndex = 0;
    }
    loadSong(songTracks[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songTracks.length - 1;
    }
    loadSong(songTracks[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
}

function setProgress(e) {
    // Important *
    const duration = audio.duration;
    const width = this.clientWidth;
    const widthX = e.offsetX;
    // Remember This
    audio.currentTime = (widthX / width) * duration;
}

play.addEventListener('click', () => {
    const isPlaying = container.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);