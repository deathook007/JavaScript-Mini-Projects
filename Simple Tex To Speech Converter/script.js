const textarea = document.querySelector('#textarea');
const speed = document.querySelector('#speed');
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const stops = document.querySelector('#stop');

let currentChar;

play.addEventListener('click', () =>{
    playText(textarea.value);
});

pause.addEventListener('click', () =>{
    pauseText();
});

stops.addEventListener('click', () =>{
    stopText();
});

speed.addEventListener('input', () =>{
    stopText();
    playText(utterance.text.substring(currentChar));
});

function playText(text) {
    if(speechSynthesis.speaking && speechSynthesis.pause()){
        return speechSynthesis.resume();
    }

    if(speechSynthesis.speaking){
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.addEventListener('end', () =>{
        textarea.disabled = false;
    });
    // Changing speed while speaking
    utterance.addEventListener('boundary', e =>{
        currentChar = e.charIndex;
    });

    // Changing speed and set default to 1
    utterance.rate = speed.value || 1;
    textarea.disabled = true;
    speechSynthesis.speak(utterance);
}

function pauseText(){
    if(speechSynthesis.speaking){
        speechSynthesis.pause();
    }
}

function stopText(){
    speechSynthesis.resume();
    speechSynthesis.cancel();
}
