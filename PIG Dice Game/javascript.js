var mainScore, score, activePlayer, dice, gameRunner;
var DOM_dice = document.querySelector('.dice');
var DOM_c0 = document.getElementById('current-0');
var DOM_c1 = document.getElementById('current-1');
var DOM_p0p = document.querySelector('.player-0-panel');
var DOM_p1p = document.querySelector('.player-1-panel');

//game start
gameStart();
//game work
document.querySelector('.btn-roll').addEventListener('click', function() {
    //check if game running or not
    if(gameRunner) {
    //random number
    dice = Math.floor(Math.random() * 6) + 1;

    //displaying result
    DOM_dice.style.display = 'block';
    DOM_dice.src = 'dice-' + dice + '.png';

    //update score if rolled no is not 1
    if(dice !== 1) {
    //add score
        score += dice;
        document.querySelector('#current-' + activePlayer).textContent = score;
    }
    else {
    //next player
    playerChange();
    }
    }  
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    //check if game is runnung or not
    if(gameRunner) {
    //adding current score to global score 
    mainScore[activePlayer] += score;

    //updating user interface
    document.querySelector('#score-' + activePlayer).textContent = mainScore[activePlayer];

    //checking if player won the game
    if (mainScore[activePlayer] >= 50) {
        document.querySelector('#name-' + activePlayer).textContent = 'winner !! :)';
        DOM_dice.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        //stop running the game
        gameRunner = false;
    }
    else {
    //next player
        playerChange();
    }
    }
});

document.querySelector('.btn-new').addEventListener('click', function() {
    //start the game again
    gameStart();
    //set everything to previous positions
    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';
    DOM_p0p.classList.remove('winner');
    DOM_p1p.classList.remove('winner');     
    DOM_p0p.classList.remove('active');     
    DOM_p1p.classList.remove('active'); 
    //activate default class
    DOM_p0p.classList.add('active');      
});

function playerChange() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    score = 0;

    DOM_c0.textContent = '0';
    DOM_c1.textContent = '0';

    DOM_p0p.classList.toggle('active');
    DOM_p1p.classList.toggle('active');

    DOM_dice.style.display = 'none';
}

function gameStart() {
    mainScore = [0,0];
    score = 0;
    activePlayer = 0;
    gameRunner = true;

    document.getElementById('score-0').textContent = '0';
    DOM_c0.textContent = '0';
    document.getElementById('score-1').textContent = '0';
    DOM_c1.textContent = '0';

    DOM_dice.style.display = 'none';
}