const countdown = document.getElementById('countdown');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const currentYear = new Date().getFullYear();

const christmasDay = new Date(`December 25 ${currentYear} 00:00:00`);

// Functions
function countdownUpdate() {
    const currentTime = new Date();
    const difference = christmasDay - currentTime;
    const dy = Math.floor(difference / 1000 / 60 / 60 / 24);
    const hr = Math.floor(difference / 1000 / 60 / 60) % 24;
    const min = Math.floor(difference / 1000 / 60) % 60;
    const sec = Math.floor(difference / 1000) % 60;

    days.innerHTML = dy;
    hours.innerHTML = hr < 10 ? '0' + hr : hr;
    minutes.innerHTML = min < 10 ? '0' + min : min;
    seconds.innerHTML = sec < 10 ? '0' + sec : sec;

}

countdownUpdate();

setInterval(countdownUpdate, 1000);