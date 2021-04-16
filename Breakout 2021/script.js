const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const startBtn = document.getElementById('start-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

const paddle = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 20,
    w: 80,
    h: 15,
    speed: 8,
    dx: 0
}

const brick = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#f0f0f0';
    ctx.strokeStyle = 'rgb(233, 66, 53)';
    ctx.stroke();
    ctx.fill();
    ctx.closePath();   
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#f0f0f0';
    ctx.strokeStyle = 'rgb(233, 66, 53)';
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

// Bricks Array
const rows = 6;
const columns = 9;

const bricks = [];
for(let i=0; i<columns; i++){
    bricks[i] = [];
    for(let j=0; j<rows; j++){
        const x = i * (brick.w + brick.padding) + brick.offsetX;
        const y = j * (brick.h + brick.padding) + brick.offsetY;  
        bricks[i][j] = {x, y, ...brick}
    }
}

let score = 0;

function drawScore(){
    ctx.font = '20px Roboto'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Drawing Bricks
function drawBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#f0f0f0' : 'transparent';
            ctx.strokeStyle = brick.visible ? 'rgb(52, 168, 83)' : 'transparent';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }) 
    })
}

function movePaddle(){
    paddle.x += paddle.dx;
    // Wall Detection
    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }
    if(paddle.x < 0){
        paddle.x = 0;
    }
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
    // Wall Detection
    if(ball.x + ball.size > canvas.width || 
        ball.x - ball.size < 0){
        // Reverse Ball in x axis
        ball.dx *= -1; 
    }
    if(ball.y + ball.size > canvas.height ||
        ball.y - ball.size < 0){
        // Reverse Ball in y axis
        ball.dy *= -1; 
    }

    // Paddle Ball Collision
    if(ball.x - ball.size > paddle.x && 
        ball.x + ball.size < paddle.x + paddle.w && 
        ball.y + ball.size > paddle.y){
        ball.dy = -ball.speed;
    }

    // Brick Ball Collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible){
                if(ball.x - ball.size > brick.x && 
                    ball.x + ball.size < brick.x +brick.w && 
                    ball.y + ball.size > brick.y && 
                    ball.y - ball.size < brick.y + brick.h){
                    ball.dy *= -1;
                    brick.visible = false;
                    updateScore();
                }
            }
        })
    })

    // Losing Case
    if(ball.y + ball.size > canvas.height){
        score = 0;
        showAllBricks();
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }
}

function updateScore(){
     score++;
     if(score % (rows * columns) === 0){
         showAllBricks();
     }
}

function showAllBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        })
    })
}

function draw(){
    // Clearing Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function update(){
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(update);
}

function startGame(){
    update();
}



function keyDown(e){
    if(e.key === 'Right' || 
    e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    }else if(e.key === 'Left' || 
    e.key === 'ArrowLeft'){
        paddle.dx = -paddle.speed;
    }else if(e.key === 'Spacebar' ||
    e.key === ' '){
        ball.dx = 0;
        ball.dy = 0;
    } 
    
} 

function keyUp(e){
    if(e.key === 'Right' || 
    e.key === 'ArrowRight' || 
    e.key === 'Left' || 
    e.key === 'ArrowLeft'){
        paddle.dx = 0;
    }else if(e.key === 'Spacebar' ||
    e.key === ' '){
        ball.dx = ball.speed;
        ball.dy = ball.speed;
    }
}
// Keyboard Event
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Buttons Functionality
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});

startBtn.addEventListener('click', () => {
    startBtn.classList.add('hide');
    startGame();
});