const wrongLetters = document.getElementById('wrong-letters');
const word = document.getElementById('word');
const popup = document.getElementById('popup-container');
const playAgain = document.getElementById('play-button');


const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

// Grabbing all parts of SVG 
const figureParts = document.querySelectorAll('.figure-part');

// List of words
const words = ['intense', 'programming', 'zugzwang', 'wizard', 'consistency', 'dedication', 'joked', 'squush'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correct = [];
const wrong = [];

// Functions

// Display word and final message
function displayWord() {
    word.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correct.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

  const innerWord = word.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won!';
    popup.style.display = 'flex';
  }
}

// Notification
function showNotification(){
  notification.classList.add('show');
  setTimeout(() =>{
    notification.classList.remove('show');
  }, 10000);
}

// Wrong letter update
function updateWrong(){
  wrongLetters.innerHTML = `
  ${wrong.length > 0 ? '<p>wrong!!</p>' : ''}
  ${wrong.map(letter => `<span>${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    const err = wrong.length;
    if(index < err){
      part.style.display = 'block';
    }else{
      part.style.display = 'none';
    }
  });

  if(wrong.length === figureParts.length){
    finalMessage.innerText = `Unfortunately you lost!`;
    popup.style.display = 'flex';
  }
}

// Key press event listener
window.addEventListener('keydown', e => {
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if(selectedWord.includes(letter)) {
      if(!correct.includes(letter)) {
        correct.push(letter);
        displayWord();
      }else{
        showNotification();
      }
    }else{
      if(!wrong.includes(letter)){
        wrong.push(letter); 
        updateWrong();
      }else{
        showNotification();
      }
    }
  }
});

// Play again button
playAgain.addEventListener('click', () =>{
  // Empty array with splice
  correct.splice(0);
  wrong.splice(0);

  // Reset
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrong();
  popup.style.display = 'none';
});

// Default display when game starts
displayWord();