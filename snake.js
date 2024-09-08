const canvas = document.getElementById('gameCanvas');  
const ctx = canvas.getContext('2d');  
const box = 20;  
let snake = [{x: box * 5, y: box * 5}];  
let direction;  
let food = {x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box};  
let game;  

function drawSnake() {  
    for (let i = 0; i < snake.length; i++) {  
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';  
        ctx.fillRect(snake[i].x, snake[i].y, box, box);  
        ctx.strokeStyle = 'darkgreen';  
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);  
    }  
}  

function drawFood() {  
    ctx.fillStyle = 'red';  
    ctx.fillRect(food.x, food.y, box, box);  
}  

function update() {  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    drawSnake();  
    drawFood();  

    let snakeX = snake[0].x;  
    let snakeY = snake[0].y;  

    if (direction == 'left') snakeX -= box;  
    if (direction == 'up') snakeY -= box;  
    if (direction == 'right') snakeX += box;  
    if (direction == 'down') snakeY += box;  

    // لتعرف إذا تعرض الثعبان للذات أو خرج من الحدود  
    if (snakeX === food.x && snakeY === food.y) {  
        food = {x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box};  
    } else {  
        snake.pop();  
    }  

    let newHead = {x: snakeX, y: snakeY};  

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {  
        clearInterval(game);  
        alert("انتهت اللعبة!");  
        document.getElementById('resetBtn').style.display = 'block';  
        return;  
    }  

    snake.unshift(newHead);  
}  

function collision(head, array) {  
    for (let i = 0; i < array.length; i++) {  
        if (head.x == array[i].x && head.y == array[i].y) {  
            return true;  
        }  
    }  
    return false;  
}  

document.addEventListener("keydown", (event) => {  
    if (event.keyCode === 37 && direction !== 'right') direction = 'left';  
    if (event.keyCode === 38 && direction !== 'down') direction = 'up';  
    if (event.keyCode === 39 && direction !== 'left') direction = 'right';  
    if (event.keyCode === 40 && direction !== 'up') direction = 'down';  
});  

document.getElementById('startBtn').onclick = function() {  
    direction = 'right';  
    game = setInterval(update, 100);  
    document.getElementById('startBtn').style.display = 'none';  
    document.getElementById('resetBtn').style.display = 'none';  
};  

document.getElementById('resetBtn').onclick = function() {  
    snake = [{x: box * 5, y: box * 5}];  
    food = {x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box};  
    direction = null;  
    clearInterval(game);  
    document.getElementById('resetBtn').style.display = 'none';  
    document.getElementById('startBtn').style.display = 'block';  
};  