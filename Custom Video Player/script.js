const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// functions
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlay() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    let min = Math.floor(video.currentTime / 60);
    if (min < 10) {
        min = '0' + String(min);
    }

    let sec = Math.floor(video.currentTime % 60);
    if (sec < 10) {
        sec = '0' + String(sec);
    }

    timestamp.innerHTML = `${min}:${sec}`;
}

function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlay);
video.addEventListener('play', updatePlay);
// timeupdate for moving slider on times
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);