let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");//re-enderiza o desenho que estará no canvas; 2d são as dimensões
let box = 32;//caixa do jogo, onde a cobra correrá
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,//o 'Mathfloor' retira as casas decimais, retornando um numero inteiro; sera add um n° de 1 a 15 dentro do box.  
    y: Math.floor(Math.random() * 15 + 1) * box 
}

function criarBG(){
    context.fillStyle = "lightgreen";//define cor; fillStyle que trabalha com o background
    context.fillRect(0, 0, 16 * box, 16 * box);//desenha o retângulo **campo** de jogo; trabalharemos com 32px
}

function criarCobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);//equivale a um quadrado xy
    }
}

function drawfood(){
    context.fillStyle = "orange";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);//sincroniza o clicar de um botao

function update(event) {//o comando vindo de um botao ira interagir com o programa atraves dessas condicionais 'se'
    if(event.keyCode == 37 &&/*&& = e*/ direction != "right") direction = "left";//se o botao clicado nao for o 37 a direcao sera para esquerda e nao para a direita
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;//faz aparecer no outro lado da tela
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawfood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;//base plano cartesiano
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 150);//'setInterval' este comando mexe com o tempo, neste caso o iniar do jogo
