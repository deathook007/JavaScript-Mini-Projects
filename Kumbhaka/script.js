const container = document.getElementById('container');
const text = document.getElementById('text');
const time = 7500;
const breath = (time / 5) * 2;
const hold = time / 5;

function animationBreath() {
    // Breath in
    text.innerText = 'Breath in!';
    container.className = 'container grow';
    setTimeout(() => {
        //Hold
        text.innerText = 'Hold!';
        setTimeout(() => {
            //Breath out 
            text.innerText = 'Breath out!';
            container.className = 'container shrink';
        }, hold);
    }, breath);
}

animationBreath();

// Repeat the animation after every 'time' intervel
setInterval(animationBreath, time);